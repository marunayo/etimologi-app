import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { pipeline } from '@xenova/transformers';

const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!)
);

async function embedWords() {
  const session = driver.session();

  try {
    console.log('⏳ Loading embedding model (download ~23MB sekali saja)...');
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    console.log('✅ Model loaded!');

    const result = await session.run(`
      MATCH (w:Word)
      WHERE w.embedding IS NULL
      RETURN w.lemma AS lemma, w.language AS language,
             w.languageName AS languageName,
             w.meaning AS meaning
    `);

    console.log(`📝 ${result.records.length} kata akan di-embed...`);

    for (const record of result.records) {
      const lemma    = record.get('lemma') as string;
      const lang     = record.get('languageName') as string;
      const language = record.get('language') as string;
      const meaning  = (record.get('meaning') as string) ?? '';

      const text = `Kata "${lemma}" dalam bahasa ${lang}. ${meaning}`.trim();

      const output = await extractor(text, { pooling: 'mean', normalize: true });
      const vector = Array.from(output.data) as number[];

      await session.run(
        `MATCH (w:Word {lemma: $lemma, language: $language})
         SET w.embedding = $embedding`,
        { lemma, language, embedding: vector }
      );

      console.log(`✅ ${lemma} (${lang}) — ${vector.length} dim`);
    }

    // all-MiniLM-L6-v2 = 384 dimensi
    await session.run(`
      CREATE VECTOR INDEX word_embedding_index IF NOT EXISTS
      FOR (w:Word) ON (w.embedding)
      OPTIONS {
        indexConfig: {
          \`vector.dimensions\`: 384,
          \`vector.similarity_function\`: 'cosine'
        }
      }
    `);

    console.log('🎉 Selesai! Vector index berhasil dibuat.');

  } finally {
    await session.close();
    await driver.close();
  }
}

embedWords().catch(console.error);