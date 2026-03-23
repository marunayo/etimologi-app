import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { runQuery } from '@/lib/neo4j';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
});

async function embedText(text: string): Promise<number[]> {
  const res = await fetch(
    'https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HuggingFace API error: ${err}`);
  }

  const data = await res.json();
  return Array.isArray(data[0]) ? data[0] : data;
}

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || typeof question !== 'string' || question.trim() === '') {
    return NextResponse.json(
      { error: 'Pertanyaan tidak boleh kosong' },
      { status: 400 }
    );
  }

  try {
    // ── Step 1: Embed query via HuggingFace API ───────────────
    const queryVector = await embedText(question.trim());

    // ── Step 2: Vector search → candidate nodes ───────────────
    const vectorResults = await runQuery(
      `CALL db.index.vector.queryNodes(
        'word_embedding_index', 10, $vector
      ) YIELD node AS w, score
      RETURN w.lemma AS lemma, w.language AS language,
             w.languageName AS languageName,
             w.meaning AS meaning, score
      ORDER BY score DESC`,
      { vector: queryVector }
    );

    const candidates = vectorResults.map((r) => ({
      lemma: r.get('lemma') as string,
      language: r.get('language') as string,
      languageName: r.get('languageName') as string,
      meaning: (r.get('meaning') as string) ?? null,
      score: r.get('score') as number,
    }));

    if (candidates.length === 0) {
      return NextResponse.json(
        { error: 'Tidak ada kata yang relevan ditemukan' },
        { status: 404 }
      );
    }

    // ── Step 3: Graph expansion → subgraph ───────────────────
    // Ambil top candidates bahasa Indonesia dengan score >= 0.85
    const topLemmas = candidates
      .filter((c) => c.language === 'id' && c.score >= 0.85)
      .slice(0, 3)
      .map((c) => c.lemma);

    // Fallback: jika tidak ada yang lolos threshold, ambil top-3 semua bahasa
    const lemmasToExpand =
      topLemmas.length > 0
        ? topLemmas
        : candidates.slice(0, 3).map((c) => c.lemma);

    const subgraphResults = await runQuery(
      `UNWIND $lemmas AS lemma
       MATCH (w:Word {lemma: lemma, language: 'id'})-[r:BORROWED_FROM*1..6]->(a)
       RETURN w.lemma AS sourceLemma,
              w.languageName AS sourceLang,
              a.lemma AS targetLemma,
              a.languageName AS targetLang,
              a.meaning AS targetMeaning,
              [rel IN r | {
                mechanism: rel.mechanism,
                period: rel.period,
                sourceRef: rel.sourceRef,
                phoneticChange: rel.phoneticChange
              }] AS relations`,
      { lemmas: lemmasToExpand }
    );

    const subgraphContext = subgraphResults.map((r) => ({
      source: {
        lemma: r.get('sourceLemma') as string,
        lang: r.get('sourceLang') as string,
      },
      target: {
        lemma: r.get('targetLemma') as string,
        lang: r.get('targetLang') as string,
        meaning: r.get('targetMeaning') as string | null,
      },
      relations: r.get('relations') as {
        mechanism: string | null;
        period: string | null;
        sourceRef: string | null;
        phoneticChange: string | null;
      }[],
    }));

    // ── Step 4: LLM generation dari subgraph context ──────────
    const { object: answer } = await generateObject({
      model: openrouter('openrouter/auto'),
      schema: z.object({
        answer: z.string().describe(
          'Jawaban naratif dalam Bahasa Indonesia yang natural. ' +
          'Mulai dari kata Bahasa Indonesia, mundur ke asal-usulnya. ' +
          'Sebut sumber jika ada di relations.sourceRef.'
        ),
        references: z.array(z.string()).describe(
          'Daftar sourceRef yang disebut dalam jawaban. Kosong jika tidak ada.'
        ),
        sourceLanguages: z.array(z.string()).describe(
          'Bahasa sumber DALAM BAHASA INDONESIA. Contoh: ["Arab", "Portugis"]'
        ),
        confidence: z.enum(['high', 'medium', 'low']),
      }),
      prompt: `Kamu adalah ahli etimologi Bahasa Indonesia.
Jawab pertanyaan berikut berdasarkan subgraph dari knowledge graph etimologi.

Pertanyaan: "${question.trim()}"

=== HASIL VECTOR SEARCH (top candidates by semantic similarity) ===
${candidates
  .map(
    (c) =>
      `- "${c.lemma}" (${c.languageName}) — similarity score: ${c.score.toFixed(4)}`
  )
  .join('\n')}

=== SUBGRAPH ETIMOLOGI (hasil graph traversal dari candidates) ===
${
  subgraphContext.length > 0
    ? JSON.stringify(subgraphContext, null, 2)
    : 'Tidak ada subgraph ditemukan untuk candidates ini.'
}

Aturan penulisan:
- Tulis narasi dari sudut pandang Bahasa Indonesia, mundur ke asal-usul
- Sertakan bentuk kata asli (etimon) dalam tanda kutip
- Sebutkan periode jika ada di relations.period
- Sebutkan sumber jika ada di relations.sourceRef dengan format: "Menurut [sumber], ..."
- Jika subgraph kosong tapi ada candidates, jawab berdasarkan candidates saja
- sourceLanguages WAJIB dalam Bahasa Indonesia`,
    });

    return NextResponse.json({
      question: question.trim(),
      pipeline: 'graphrag',
      vectorSearch: {
        candidatesFound: candidates.length,
        topCandidates: candidates.slice(0, 5),
      },
      graphExpansion: {
        lemmasExpanded: lemmasToExpand,
        subgraphSize: subgraphContext.length,
      },
      answer: answer.answer,
      references: answer.references,
      sourceLanguages: answer.sourceLanguages,
      confidence: answer.confidence,
    });
  } catch (err) {
    console.error('❌ /api/graphrag error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Gagal memproses GraphRAG', detail: message },
      { status: 500 }
    );
  }
}