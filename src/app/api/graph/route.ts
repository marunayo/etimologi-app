import { NextRequest, NextResponse } from 'next/server';
import { runQuery } from '@/lib/neo4j';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lemma = searchParams.get('lemma');

  if (!lemma) {
    return NextResponse.json({ error: 'Parameter lemma diperlukan' }, { status: 400 });
  }

  try {
    // Ambil seluruh chain etimologi (maksimal 6 hop)
    const records = await runQuery(
      `MATCH path = (start:Word {language: 'id'})
         -[:BORROWED_FROM*1..6]->
       (ancestor:Word)
       WHERE toLower(start.lemma) = toLower($lemma)
       UNWIND nodes(path) AS n
       UNWIND relationships(path) AS r
       WITH collect(DISTINCT {
         id: elementId(n),
         lemma: n.lemma,
         language: n.language,
         languageName: n.languageName,
         pos: n.pos,
         meaning: n.meaning
       }) AS nodes,
       collect(DISTINCT {
         source: elementId(startNode(r)),
         target: elementId(endNode(r)),
         mechanism: r.mechanism,
         period: r.period,
         phoneticChange: r.phoneticChange,
         sourceRef: r.sourceRef
       }) AS edges
       RETURN nodes, edges`,
      { lemma }
    );

    if (records.length === 0) {
      return NextResponse.json({ nodes: [], edges: [] });
    }

    const nodes = records[0].get('nodes');
    const edges = records[0].get('edges');

    return NextResponse.json({ nodes, edges });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Gagal mengambil data graf' }, { status: 500 });
  }
}