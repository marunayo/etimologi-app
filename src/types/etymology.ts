export interface WordNode {
  lemma: string;
  language: string;      // kode ISO 639: 'id', 'ar', 'nl', 'pt', 'sa', 'en', 'la'
  languageName: string;  // nama lengkap: 'Bahasa Indonesia', 'Arab', dst
  pos?: string;          // part of speech: 'noun', 'verb', 'adjective'
  meaning?: string;      // makna kata
}

export interface BorrowedFromRelation {
  mechanism?: string;    // 'direct', 'via', 'calque'
  period?: string;       // '13th century', 'colonial era', dst
  phoneticChange?: string;
  sourceRef?: string;    // referensi buku/sumber
}

export interface EtymologyGraph {
  nodes: Array<WordNode & { id: string }>;
  edges: Array<{
    source: string;
    target: string;
    relation: BorrowedFromRelation;
  }>;
}