'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ResultCard from '@/components/ResultCard';
import GraphViewer from '@/components/GraphViewer';

interface QueryResult {
  question: string;
  answer: string;
  sourceLanguages: string[];
  confidence: 'high' | 'medium' | 'low';
  cypherUsed: string;
}

interface GraphData {
  nodes: {
    id: string;
    lemma: string;
    language: string;
    languageName: string;
    pos?: string;
    meaning?: string;
  }[];
  edges: {
    source: string;
    target: string;
    mechanism?: string;
    period?: string;
    sourceRef?: string;
  }[];
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Ekstrak nama kata dari pertanyaan untuk fetch graph
  const extractLemma = (question: string): string | null => {
    const patterns = [
      /kata\s+["']?(\w+)["']?/i,
      /asal[- ]usul\s+["']?(\w+)["']?/i,
      /etimologi\s+["']?(\w+)["']?/i,
      /["'](\w+)["']/,
    ];
    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match) return match[1].toLowerCase();
    }
    return null;
  };

  const handleSearch = async (question: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setGraphData(null);

    try {
      // Fetch query result dan graph data secara paralel
      const lemma = extractLemma(question);
      const [queryRes, graphRes] = await Promise.all([
        fetch('/api/query', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        }),
        lemma
          ? fetch(`/api/graph?lemma=${encodeURIComponent(lemma)}`)
          : Promise.resolve(null),
      ]);

      const queryData = await queryRes.json();
      if (!queryRes.ok) throw new Error(queryData.error ?? 'Gagal memproses pertanyaan');

      setResult({
        question: queryData.question,
        answer: queryData.answer,
        sourceLanguages: queryData.sourceLanguages,
        confidence: queryData.confidence,
        cypherUsed: queryData.cypherUsed,
      });

      if (graphRes) {
        const gData = await graphRes.json();
        if (gData.nodes?.length > 0) setGraphData(gData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            🔍 Etimologi Bahasa Indonesia
          </h1>
          <p className="text-gray-500">
            Telusuri asal-usul kata menggunakan Graph Database & AI
          </p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 bg-white rounded-2xl border border-gray-100" />
            <div className="h-72 bg-white rounded-2xl border border-gray-100" />
          </div>
        )}

        {/* Results */}
        {!isLoading && result && (
          <div className="space-y-4">
            <ResultCard {...result} />
            {graphData && <GraphViewer nodes={graphData.nodes} edges={graphData.edges} />}
          </div>
        )}
      </div>
    </main>
  );
}