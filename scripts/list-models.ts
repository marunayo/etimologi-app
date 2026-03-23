import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

async function listModels() {
  // @ts-expect-error listModels() is not exposed in the public API types
  const models = await genAI.listModels();
  for await (const model of models) {
    console.log(model.name, '→', model.supportedGenerationMethods);
  }
}

listModels().catch(console.error);