# 🔍 Etimologi Bahasa Indonesia

Aplikasi web untuk menelusuri asal-usul kata Bahasa Indonesia menggunakan **GraphRAG** (Graph Retrieval-Augmented Generation), **Neo4j Property Graph**, dan **LLM**.

## Tech Stack

- **Frontend**: Next.js 16, Tailwind CSS, Cytoscape.js
- **Backend**: Next.js API Routes
- **Database**: Neo4j (Graph Database)
- **AI**: OpenRouter (via Vercel AI SDK)
- **Language**: TypeScript

## Fitur

- 🔍 Query natural language → Cypher otomatis
- 🕸️ Visualisasi graf etimologi interaktif
- 📖 Narasi penjelasan asal-usul kata
- 📚 Referensi sumber kredibel (Russell Jones, 2008)
- 🌐 Multi-hop etymology chain (hingga 6 hop)