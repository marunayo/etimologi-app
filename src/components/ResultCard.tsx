import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ResultCardProps {
  question: string;
  answer: string;
  references: string[];
  sourceLanguages: string[];
  confidence: 'high' | 'medium' | 'low';
  cypherUsed: string;
}

const confidenceConfig = {
  high:   { label: 'Data lengkap',  color: 'text-green-600 bg-green-50',   icon: CheckCircle },
  medium: { label: 'Data parsial',  color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle },
  low:    { label: 'Data terbatas', color: 'text-red-600 bg-red-50',       icon: AlertCircle },
};

export default function ResultCard({
  question,
  answer,
  references,
  sourceLanguages,
  confidence,
  cypherUsed,
}: ResultCardProps) {
  const cfg = confidenceConfig[confidence];
  const Icon = cfg.icon;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Pertanyaan</p>
        <p className="font-semibold text-gray-800">&ldquo;{question}&rdquo;</p>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Narasi jawaban */}
        <p className="text-gray-700 leading-relaxed">{answer}</p>

        {/* Badge referensi */}
        {references && references.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {references.map((ref) => (
              <span
                key={ref}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                           bg-amber-50 text-amber-700 border border-amber-100 font-medium"
              >
                📚 {ref}
              </span>
            ))}
          </div>
        )}

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {/* Confidence */}
          <span
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${cfg.color}`}
          >
            <Icon size={13} />
            {cfg.label}
          </span>

          {/* Source languages */}
          {sourceLanguages.map((lang) => (
            <span
              key={lang}
              className="text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 font-medium"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Cypher query collapsible */}
        <details className="mt-1">
          <summary className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer
                              hover:text-gray-600 transition-colors select-none w-fit">
            <Info size={12} />
            Lihat query yang digunakan
          </summary>
          <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 overflow-x-auto
                          font-mono border border-gray-100 whitespace-pre-wrap leading-relaxed">
            {cypherUsed}
          </pre>
        </details>
      </div>
    </div>
  );
}