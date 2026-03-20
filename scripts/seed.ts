import 'dotenv/config';
import { runQuery } from '../src/lib/neo4j';
import { seedData } from './data/etymology-seed';

async function createConstraints() {
  // Unique constraint agar tidak duplikat node
  await runQuery(`
    CREATE CONSTRAINT word_unique IF NOT EXISTS
    FOR (w:Word) REQUIRE (w.lemma, w.language) IS UNIQUE
  `);
  console.log('✅ Constraints created');
}

async function seedWords() {
  let wordCount = 0;
  let relCount = 0;

  for (const entry of seedData) {
    // Upsert node kata utama
    await runQuery(
      `MERGE (w:Word {lemma: $lemma, language: $language})
       SET w.languageName = $languageName,
           w.pos = $pos,
           w.meaning = $meaning`,
      {
        lemma: entry.word.lemma,
        language: entry.word.language,
        languageName: entry.word.languageName,
        pos: entry.word.pos ?? null,
        meaning: entry.word.meaning ?? null,
      }
    );
    wordCount++;

    // Buat relasi BORROWED_FROM
    if (entry.borrowedFrom) {
      for (const borrowed of entry.borrowedFrom) {
        // Upsert node sumber
        await runQuery(
          `MERGE (w:Word {lemma: $lemma, language: $language})
           SET w.languageName = $languageName`,
          {
            lemma: borrowed.word.lemma,
            language: borrowed.word.language,
            languageName: borrowed.word.languageName,
          }
        );

        // Buat relasi
        await runQuery(
          `MATCH (from:Word {lemma: $fromLemma, language: $fromLang})
           MATCH (to:Word {lemma: $toLemma, language: $toLang})
           MERGE (from)-[r:BORROWED_FROM]->(to)
           SET r.mechanism = $mechanism,
               r.period = $period,
               r.phoneticChange = $phoneticChange,
               r.sourceRef = $sourceRef`,
          {
            fromLemma: entry.word.lemma,
            fromLang: entry.word.language,
            toLemma: borrowed.word.lemma,
            toLang: borrowed.word.language,
            mechanism: borrowed.relation.mechanism ?? null,
            period: borrowed.relation.period ?? null,
            phoneticChange: borrowed.relation.phoneticChange ?? null,
            sourceRef: borrowed.relation.sourceRef ?? null,
          }
        );
        relCount++;
      }
    }
  }

  console.log(`✅ Seeded ${wordCount} word nodes`);
  console.log(`✅ Seeded ${relCount} BORROWED_FROM relations`);
}

async function main() {
  console.log('🌱 Starting seed...');
  await createConstraints();
  await seedWords();
  console.log('🎉 Seed complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});