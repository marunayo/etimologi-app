import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { runQuery } from '@/lib/neo4j';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const MODEL = 'openrouter/auto';

const SCHEMA_DESCRIPTION = `
Graph schema Neo4j:
- Node: (:Word {lemma: string, language: string, languageName: string, pos?: string, meaning?: string})
- Relasi: [:BORROWED_FROM {mechanism?: string, period?: string, phoneticChange?: string, sourceRef?: string}]
- Language codes: 'id'=Indonesia, 'ar'=Arab, 'nl'=Belanda, 'pt'=Portugis, 'sa'=Sanskerta, 'en'=Inggris, 'la'=Latin, 'zh'=Tionghoa, 'es'=Spanyol, 'el'=Yunani
- Query asal-usul WAJIB include relasi: MATCH (w:Word {lemma:'sabun', language:'id'})-[r:BORROWED_FROM*1..6]->(a) RETURN w, r, a LIMIT 50
- Query satu hop: MATCH (w:Word {lemma:'kitab', language:'id'})-[r:BORROWED_FROM]->(a) RETURN w, r, a LIMIT 50
- Query per bahasa: MATCH (w:Word {language:'id'})-[r:BORROWED_FROM]->(a:Word {language:'ar'}) RETURN w, r, a LIMIT 50
`;

// Sanitasi Cypher agar tidak ada variable tidak terdefinisi
function sanitizeCypher(cypher: string): string {
  // Jika query pakai multi-hop tanpa nama relasi, inject nama 'r'
  cypher = cypher.replace(
    /\[:BORROWED_FROM(\*[\d.]+)?\]/g,
    '[r:BORROWED_FROM$1]'
  );

  // Jika RETURN ada 'w' dan 'a' tapi tidak ada 'r', inject 'r'
  if (/RETURN\s+/i.test(cypher) && !/\br\b/.test(cypher.split(/RETURN/i)[1])) {
    cypher = cypher.replace(/\bRETURN\b/i, 'RETURN r,');
  }

  // Pastikan LIMIT ada
  if (!/LIMIT\s+\d+/i.test(cypher)) {
    cypher = cypher.trimEnd() + ' LIMIT 50';
  }

  return cypher;
}

// Reshape rawData agar chain etimologi terbaca jelas oleh LLM
function reshapeEtymologyChain(data: Record<string, unknown>[]): unknown {
  if (data.length === 0) return data;

  const isChainQuery = 'w' in data[0] && 'a' in data[0];
  if (!isChainQuery) return data;

  const sourceWord = data[0]['w'] as Record<string, unknown>;

  // r bisa berupa single object atau array (multi-hop)
  function extractRelProps(r: unknown): Record<string, unknown> {
    if (!r) return {};
    // Multi-hop: r adalah array, ambil yang punya sourceRef
    if (Array.isArray(r)) {
      const withSource = r.find(
        (rel) => rel && typeof rel === 'object' && 'properties' in rel
          ? (rel as { properties: Record<string, unknown> }).properties?.sourceRef
          : (rel as Record<string, unknown>)?.sourceRef
      );
      const target = withSource ?? r[0];
      if (target && typeof target === 'object' && 'properties' in target) {
        return (target as { properties: Record<string, unknown> }).properties;
      }
      return (target as Record<string, unknown>) ?? {};
    }
    // Single hop: r adalah object
    if (typeof r === 'object' && 'properties' in (r as object)) {
      return (r as { properties: Record<string, unknown> }).properties;
    }
    return r as Record<string, unknown>;
  }

  const allSourceRefs = data
    .map((row) => extractRelProps(row['r'])?.sourceRef as string | undefined)
    .filter((ref): ref is string => !!ref)
    .filter((ref, i, arr) => arr.indexOf(ref) === i);

  const ancestors = data.map((row, i) => {
    const a = row['a'] as Record<string, unknown>;
    const relProps = extractRelProps(row['r']);
    return {
      step: i + 1,
      lemma: a.lemma,
      language: a.language,
      languageName: a.languageName,
      meaning: a.meaning ?? null,
      borrowedVia: {
        mechanism: relProps?.mechanism ?? null,
        period: relProps?.period ?? null,
        sourceRef: relProps?.sourceRef ?? null,
      },
    };
  });

  return {
    sourceWord: {
      lemma: sourceWord.lemma,
      language: sourceWord.language,
      languageName: sourceWord.languageName,
      meaning: sourceWord.meaning ?? null,
    },
    etymologyChain: ancestors,
    allSourceRefs,
    summary: `${sourceWord.lemma} (${sourceWord.languageName}) ← ${ancestors
      .map((a) => `${a.lemma} (${a.languageName})`)
      .join(' ← ')}`,
  };
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
    // ── Step 1: Generate Cypher query dari pertanyaan ──────────
    const { object: cypherResult } = await generateObject({
      model: openrouter(MODEL),
      schema: z.object({
        cypher: z.string().describe(
          'Query Cypher yang valid untuk Neo4j. Hanya READ query.'
        ),
        explanation: z.string().describe(
          'Penjelasan singkat dalam Bahasa Indonesia tentang apa yang dicari query ini'
        ),
      }),
      prompt: `Kamu adalah ahli Neo4j Cypher untuk database etimologi Bahasa Indonesia.
Konversi pertanyaan pengguna menjadi Cypher query yang valid.

${SCHEMA_DESCRIPTION}

Pertanyaan: "${question.trim()}"

Aturan WAJIB:
- Hanya gunakan MATCH, WHERE, RETURN, WITH, OPTIONAL MATCH
- DILARANG KERAS: CREATE, DELETE, SET, MERGE, REMOVE
- Selalu tambahkan LIMIT 50 di akhir
- Gunakan toLower() untuk perbandingan string agar case-insensitive
- Jika pertanyaan tentang asal-usul satu kata, gunakan [:BORROWED_FROM*1..6] untuk multi-hop
- Jika pertanyaan tentang daftar kata dari bahasa tertentu, filter by language property
- JANGAN gunakan variabel relasi (misal [r:BORROWED_FROM]) kecuali jika properties relasi dibutuhkan
- Jika hanya butuh data node: MATCH (w)-[:BORROWED_FROM*1..6]->(a) RETURN w, a
- Jika butuh properties relasi, WAJIB beri nama: MATCH (w)-[r:BORROWED_FROM]->(a) RETURN w, r, a
- JANGAN pernah menulis RETURN r jika r tidak didefinisikan di MATCH clause`,
    });

    // ── Step 2: Sanitasi & eksekusi Cypher ke Neo4j ───────────
    let rawData: Record<string, unknown>[] = [];
    let queryError: string | null = null;

    const safeCypher = sanitizeCypher(cypherResult.cypher);

    try {
      const records = await runQuery(safeCypher);
      rawData = records.map((record) => {
        const obj: Record<string, unknown> = {};
        record.keys.forEach((key) => {
          const k = String(key);
          const val = record.get(k);
          if (val && typeof val === 'object' && 'properties' in val) {
            obj[k] = val.properties;
          } else {
            obj[k] = val;
          }
        });
        return obj;
      });
    } catch (err) {
      queryError = err instanceof Error ? err.message : 'Unknown query error';
      console.warn('⚠️ Cypher query error:', queryError);
      console.warn('⚠️ Query yang gagal:', safeCypher);
    }

    // ── Step 3: Generate jawaban naratif ──────────────────────
    const reshapedData = reshapeEtymologyChain(rawData);

    const { object: answer } = await generateObject({
      model: openrouter(MODEL),
      schema: z.object({
        answer: z.string().describe(
          'Jawaban naratif dalam Bahasa Indonesia yang natural dan informatif. ' +
          'WAJIB menyebut sumber dengan format "Menurut [sumber], ..." jika sourceRef tersedia.'
        ),
        references: z.array(z.string()).describe(
          'Daftar sumber referensi yang disebut dalam jawaban. ' +
          'Ambil dari field sourceRef di data. Kosong [] jika tidak ada sourceRef.'
        ),
        sourceLanguages: z.array(z.string()).describe(
          'Daftar nama bahasa sumber DALAM BAHASA INDONESIA. ' +
          'Contoh benar: ["Arab", "Portugis", "Latin"]. ' +
          'Contoh SALAH: ["Arabic", "Portuguese", "Latin"]'
        ),
        confidence: z.enum(['high', 'medium', 'low']).describe(
          'high: data tersedia lengkap dan menjawab pertanyaan dengan baik. ' +
          'medium: data hanya menjawab sebagian pertanyaan. ' +
          'low: data kosong, tidak relevan, atau terjadi query error.'
        ),
      }),
      prompt: `Kamu adalah ahli etimologi Bahasa Indonesia yang membantu pengguna memahami asal-usul kata.
Jawab pertanyaan berikut berdasarkan HANYA data yang diberikan dari database.

Pertanyaan: "${question.trim()}"

${queryError ? `⚠️ Terjadi error saat mengambil data: ${queryError}` : ''}

Data dari database Neo4j:
${rawData.length > 0 ? JSON.stringify(reshapedData, null, 2) : 'Tidak ada data yang ditemukan.'}

Aturan penulisan narasi WAJIB:
- Tulis dari SUDUT PANDANG Bahasa Indonesia, mundur ke asal-usulnya
  ✅ BENAR: "Kata 'sabun' dalam Bahasa Indonesia diserap dari bahasa Portugis 'sabão',
     yang sebelumnya berasal dari bahasa Arab 'صابون', dan lebih jauh lagi dari bahasa Latin 'sapo'."
  ❌ SALAH: "Kata ini berasal dari Latin, lalu diserap Arab, lalu Portugis, lalu Indonesia."
- Gunakan field 'summary' dari data sebagai panduan urutan chain etimologi
- Mulai narasi SELALU dari kata Bahasa Indonesia, baru mundur ke asal-usulnya
- Sertakan bentuk kata aslinya (etimon) dalam tanda kutip di setiap bahasa
- Sebutkan periode/abad jika tersedia di data (misal: "pada abad ke-16")
- JANGAN sebut istilah teknis seperti "jalur via", "mekanisme direct", "BORROWED_FROM", atau nama field database
- Gunakan bahasa natural: "diserap dari", "berasal dari", "diturunkan dari", "masuk ke Indonesia melalui"
- Jika ada sourceRef di data, WAJIB sebut di narasi dengan format:
  ✅ "Menurut Russell Jones dalam 'Loan-Words in Indonesian and Malay' (2008), kata ini..."
  ✅ "...diserap dari bahasa Latin 'sapo'. (Sumber: Russell Jones, 2008)"
- Jika TIDAK ada sourceRef sama sekali di data, JANGAN mengarang sumber
- Jika data kosong atau queryError tidak null, sampaikan dengan sopan bahwa informasi belum tersedia

Aturan output lainnya:
- references: ambil nilai dari field sourceRef yang ada di data, jangan dikarang
- sourceLanguages WAJIB dalam Bahasa Indonesia
  ✅ Benar: "Arab", "Portugis", "Latin", "Belanda", "Sanskerta", "Tionghoa", "Inggris"
  ❌ Salah: "Arabic", "Portuguese", "Latin", "Dutch", "Sanskrit", "Chinese", "English"
- confidence = 'high' HANYA jika rawData tidak kosong DAN menjawab pertanyaan secara lengkap
- confidence = 'medium' jika data ada tapi hanya menjawab sebagian
- confidence = 'low' jika rawData kosong atau queryError tidak null`,
    });

    return NextResponse.json({
      question: question.trim(),
      cypherUsed: safeCypher,
      cypherExplanation: cypherResult.explanation,
      queryError,
      rawData,
      answer: answer.answer,
      references: answer.references,
      sourceLanguages: answer.sourceLanguages,
      confidence: answer.confidence,
    });

  } catch (err) {
    console.error('❌ /api/query error:', err);

    const message = err instanceof Error ? err.message : 'Unknown error';
    const isQuotaError = message.includes('quota') || message.includes('429');
    const isModelError = message.includes('model') || message.includes('404');

    return NextResponse.json(
      {
        error: isQuotaError
          ? 'Quota AI habis, coba beberapa saat lagi'
          : isModelError
          ? 'Model AI tidak tersedia, coba ganti model'
          : 'Gagal memproses pertanyaan',
        detail: message,
      },
      { status: 500 }
    );
  }
}