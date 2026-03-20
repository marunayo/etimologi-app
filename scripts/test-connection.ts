import 'dotenv/config';
import { runQuery } from '../src/lib/neo4j';

async function main() {
  const records = await runQuery('RETURN "Koneksi berhasil!" AS message');
  console.log(records[0].get('message'));
  process.exit(0);
}

main().catch(console.error);