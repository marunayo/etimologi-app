'use client';

import { useState, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (question: string) => void;
  isLoading: boolean;
}

const EXAMPLE_QUESTIONS = [
  'Dari mana asal kata sabun?',
  'Apa asal-usul kata sekolah?',
  'Kata apa saja yang berasal dari bahasa Arab?',
  'Jelaskan etimologi kata kopi!',
];

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) onSearch(input.trim());
  };

  return (
    <div className="w-full space-y-3">
      <form ref={formRef} onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan asal-usul sebuah kata..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-gray-800 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || input.trim().length === 0}
          suppressHydrationWarning
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300
                     text-white rounded-xl shadow-sm transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
          <span className="hidden sm:inline">Cari</span>
        </button>
      </form>

      {/* Contoh pertanyaan */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => { setInput(q); onSearch(q); }}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-50
                       hover:text-blue-600 text-gray-600 transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}