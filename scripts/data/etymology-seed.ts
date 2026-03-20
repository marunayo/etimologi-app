import { WordNode, BorrowedFromRelation } from '../../src/types/etymology';

export interface SeedEntry {
  word: WordNode;
  borrowedFrom?: {
    word: WordNode;
    relation: BorrowedFromRelation;
  }[];
}

const REF_JONES = 'Russell Jones, Loan-Words in Indonesian and Malay (2008)';
const REF_KAMUS = 'Kamus Etimologi Bahasa Indonesia (1987)';
const REF_WIKT = 'Wiktionary (Kaikki dump)';

export const seedData: SeedEntry[] = [
  // ── SERAPAN ARAB ──────────────────────────────────────────────
  {
    word: { lemma: 'kitab', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'buku, terutama yang berisi ajaran agama' },
    borrowedFrom: [{ word: { lemma: 'كِتَاب', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'waktu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'satuan atau rentang masa' },
    borrowedFrom: [{ word: { lemma: 'وَقْت', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'ilmu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pengetahuan atau sains' },
    borrowedFrom: [{ word: { lemma: 'عِلْم', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'akal', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kemampuan berpikir, rasio' },
    borrowedFrom: [{ word: { lemma: 'عَقْل', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'maaf', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pengampunan atas kesalahan' },
    borrowedFrom: [{ word: { lemma: 'مَعَاف', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'kabar', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'berita atau informasi' },
    borrowedFrom: [{ word: { lemma: 'خَبَر', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '14th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'hakim', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pejabat yang mengadili perkara' },
    borrowedFrom: [{ word: { lemma: 'حَاكِم', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '14th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'kursi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat duduk berkaki' },
    borrowedFrom: [{ word: { lemma: 'كُرْسِي', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '14th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'selamat', language: 'id', languageName: 'Bahasa Indonesia', pos: 'adjective', meaning: 'terbebas dari bahaya atau celaka' },
    borrowedFrom: [{ word: { lemma: 'سَلَامَة', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'masjid', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat ibadah umat Islam' },
    borrowedFrom: [{ word: { lemma: 'مَسْجِد', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', period: '13th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'nafsu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'keinginan atau hasrat kuat' },
    borrowedFrom: [{ word: { lemma: 'نَفْس', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'abad', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'seratus tahun' },
    borrowedFrom: [{ word: { lemma: 'أَبَد', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'rezeki', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'segala yang diperoleh untuk kebutuhan hidup' },
    borrowedFrom: [{ word: { lemma: 'رِزْق', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'musim', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pembagian waktu dalam setahun' },
    borrowedFrom: [{ word: { lemma: 'مَوْسِم', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'mimpi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pengalaman saat tidur' },
    borrowedFrom: [{ word: { lemma: 'مَنَامٌ', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_WIKT } }]
  },

  // ── SERAPAN BELANDA ───────────────────────────────────────────
  {
    word: { lemma: 'kantor', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat bekerja administrasi' },
    borrowedFrom: [{ word: { lemma: 'kantoor', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'gratis', language: 'id', languageName: 'Bahasa Indonesia', pos: 'adjective', meaning: 'tidak dipungut biaya' },
    borrowedFrom: [{ word: { lemma: 'gratis', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'polisi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'aparat penegak hukum' },
    borrowedFrom: [{ word: { lemma: 'politie', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'korupsi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'penyalahgunaan jabatan untuk kepentingan pribadi' },
    borrowedFrom: [{ word: { lemma: 'corruptie', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'wortel', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'sayuran akar berwarna oranye' },
    borrowedFrom: [{ word: { lemma: 'wortel', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'handuk', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kain penyerap air untuk mengeringkan tubuh' },
    borrowedFrom: [{ word: { lemma: 'handdoek', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'sepatu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alas kaki yang menutup telapak dan jari kaki' },
    borrowedFrom: [{ word: { lemma: 'schoen', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'schoen→sepatu', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'bengkel', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat memperbaiki kendaraan atau mesin' },
    borrowedFrom: [{ word: { lemma: 'winkel', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'botol', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'wadah cairan dari kaca atau plastik' },
    borrowedFrom: [{ word: { lemma: 'bottel', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'dompet', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat menyimpan uang dan kartu' },
    borrowedFrom: [{ word: { lemma: 'dompet', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'knalpot', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pipa pembuangan gas kendaraan' },
    borrowedFrom: [{ word: { lemma: 'knalpot', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'sekolah', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lembaga pendidikan formal' },
    borrowedFrom: [{ word: { lemma: 'school', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'kulkas', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lemari pendingin makanan' },
    borrowedFrom: [{ word: { lemma: 'koelkast', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'koelkast→kulkas', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'trotoar', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'jalur pejalan kaki di pinggir jalan' },
    borrowedFrom: [{ word: { lemma: 'trottoir', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'biskuit', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kue kering renyah' },
    borrowedFrom: [{ word: { lemma: 'biscuit', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'potlot', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pensil' },
    borrowedFrom: [{ word: { lemma: 'potlood', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_JONES } }]
  },

  // ── SERAPAN PORTUGIS ──────────────────────────────────────────
  {
    word: { lemma: 'sabun', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'bahan pembersih dari lemak dan alkali' },
    borrowedFrom: [
      { word: { lemma: 'sabão', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } },
    ]
  },
  {
    word: { lemma: 'sabão', language: 'pt', languageName: 'Portugis' },
    borrowedFrom: [
      { word: { lemma: 'صَابُون', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'via', sourceRef: REF_JONES } }
    ]
  },
  {
    word: { lemma: 'صَابُون', language: 'ar', languageName: 'Arab' },
    borrowedFrom: [
      { word: { lemma: 'sapo', language: 'la', languageName: 'Latin' }, relation: { mechanism: 'via', sourceRef: REF_JONES } }
    ]
  },
  {
    word: { lemma: 'gereja', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'tempat ibadah umat Kristiani' },
    borrowedFrom: [{ word: { lemma: 'igreja', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'meja', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'perabot berkaki dengan permukaan datar' },
    borrowedFrom: [{ word: { lemma: 'mesa', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'jendela', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lubang berdinding kaca pada bangunan' },
    borrowedFrom: [{ word: { lemma: 'janela', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'bendera', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kain lambang negara atau organisasi' },
    borrowedFrom: [{ word: { lemma: 'bandeira', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'mentega', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lemak susu yang dipadatkan' },
    borrowedFrom: [{ word: { lemma: 'manteiga', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'garpu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alat makan bergigi' },
    borrowedFrom: [{ word: { lemma: 'garfo', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'padri', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pendeta Katolik' },
    borrowedFrom: [{ word: { lemma: 'padre', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'nanas', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'buah tropis berduri' },
    borrowedFrom: [{ word: { lemma: 'ananás', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'lemari', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'perabot penyimpan pakaian atau barang' },
    borrowedFrom: [{ word: { lemma: 'armário', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'kereta', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kendaraan beroda' },
    borrowedFrom: [{ word: { lemma: 'carreta', language: 'pt', languageName: 'Portugis' }, relation: { mechanism: 'direct', period: '16th century', sourceRef: REF_JONES } }]
  },

  // ── SERAPAN SANSKERTA ─────────────────────────────────────────
  {
    word: { lemma: 'bahasa', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'sistem lambang bunyi untuk komunikasi' },
    borrowedFrom: [{ word: { lemma: 'bhāṣā', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'raja', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'penguasa kerajaan' },
    borrowedFrom: [{ word: { lemma: 'rāja', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'negara', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'organisasi kekuasaan yang berdaulat' },
    borrowedFrom: [{ word: { lemma: 'nagara', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'agama', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'sistem kepercayaan dan praktik spiritual' },
    borrowedFrom: [{ word: { lemma: 'āgama', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'wanita', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'perempuan dewasa' },
    borrowedFrom: [{ word: { lemma: 'vanita', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'kaca', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'benda bening keras dari silika' },
    borrowedFrom: [{ word: { lemma: 'kāca', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'surga', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alam kehidupan setelah mati yang penuh kebaikan' },
    borrowedFrom: [{ word: { lemma: 'svarga', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'neraka', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alam kehidupan setelah mati yang penuh siksaan' },
    borrowedFrom: [{ word: { lemma: 'naraka', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'dewa', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'makhluk ilahi dalam kepercayaan Hindu' },
    borrowedFrom: [{ word: { lemma: 'deva', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'karya', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'hasil ciptaan atau pekerjaan' },
    borrowedFrom: [{ word: { lemma: 'kārya', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'guna', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'manfaat atau kegunaan' },
    borrowedFrom: [{ word: { lemma: 'guṇa', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'manusia', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'makhluk hidup berakal budi' },
    borrowedFrom: [{ word: { lemma: 'manuṣya', language: 'sa', languageName: 'Sanskerta' }, relation: { mechanism: 'direct', period: 'pre-Islamic', sourceRef: REF_KAMUS } }]
  },
  {
    word: { lemma: 'dunia', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'bumi dan seisinya' },
    borrowedFrom: [{ word: { lemma: 'دُنْيَا', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'sejarah', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'catatan peristiwa masa lampau' },
    borrowedFrom: [{ word: { lemma: 'شَجَرَة', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'direct', phoneticChange: 'syajarah (pohon/silsilah) → sejarah', sourceRef: REF_JONES } }]
  },

  // ── SERAPAN INGGRIS ───────────────────────────────────────────
  {
    word: { lemma: 'televisi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'perangkat penerima siaran gambar dan suara' },
    borrowedFrom: [{ word: { lemma: 'television', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'komputer', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'mesin pemroses data elektronik' },
    borrowedFrom: [{ word: { lemma: 'computer', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'internet', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'jaringan komunikasi global' },
    borrowedFrom: [{ word: { lemma: 'internet', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'hotel', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'penginapan komersial' },
    borrowedFrom: [{ word: { lemma: 'hotel', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '19th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'kamera', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alat untuk mengambil foto atau video' },
    borrowedFrom: [{ word: { lemma: 'camera', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '19th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'film', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'karya sinematografi' },
    borrowedFrom: [{ word: { lemma: 'film', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'bus', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kendaraan umum berkapasitas besar' },
    borrowedFrom: [{ word: { lemma: 'bus', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'ban', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lingkaran karet pada roda kendaraan' },
    borrowedFrom: [{ word: { lemma: 'band', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'direct', period: '20th century', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'kopi', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'minuman dari biji kopi yang diseduh' },
    borrowedFrom: [{ word: { lemma: 'koffie', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'via', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'koffie', language: 'nl', languageName: 'Belanda' },
    borrowedFrom: [
      { word: { lemma: 'قَهْوَة', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'via', sourceRef: REF_JONES } }
    ]
  },

  // ── SERAPAN TIONGHOA ──────────────────────────────────────────
  {
    word: { lemma: 'bakso', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'bola daging yang disajikan dengan kuah' },
    borrowedFrom: [{ word: { lemma: '肉酥', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'bak-so → bakso', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'tahu', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'makanan dari endapan protein kedelai' },
    borrowedFrom: [{ word: { lemma: '豆腐', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'tāu-hū → tahu', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'tauge', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'kecambah kacang hijau atau kedelai' },
    borrowedFrom: [{ word: { lemma: '豆芽', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'mie', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'makanan dari adonan tepung berbentuk untaian panjang' },
    borrowedFrom: [{ word: { lemma: '麵', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'mī → mie', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'loteng', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'lantai atas atau ruang di bawah atap' },
    borrowedFrom: [{ word: { lemma: '樓頂', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'teh', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'minuman dari daun teh yang diseduh' },
    borrowedFrom: [{ word: { lemma: '茶', language: 'zh', languageName: 'Tionghoa (Hokkian)' }, relation: { mechanism: 'direct', period: 'colonial era', phoneticChange: 'tê → teh', sourceRef: REF_WIKT } }]
  },

  // ── SERAPAN MULTI-HOP (chain) ─────────────────────────────────
  {
    word: { lemma: 'gitar', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'alat musik petik berdawai' },
    borrowedFrom: [{ word: { lemma: 'gitaar', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'via', period: 'colonial era', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'gitaar', language: 'nl', languageName: 'Belanda' },
    borrowedFrom: [{ word: { lemma: 'guitar', language: 'en', languageName: 'Inggris' }, relation: { mechanism: 'via', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'guitar', language: 'en', languageName: 'Inggris' },
    borrowedFrom: [{ word: { lemma: 'guitarra', language: 'es', languageName: 'Spanyol' }, relation: { mechanism: 'via', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'guitarra', language: 'es', languageName: 'Spanyol' },
    borrowedFrom: [{ word: { lemma: 'κιθάρα', language: 'el', languageName: 'Yunani' }, relation: { mechanism: 'via', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'alkohol', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'senyawa organik hidroksil, juga minuman keras' },
    borrowedFrom: [{ word: { lemma: 'alcohol', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'via', period: 'colonial era', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'alcohol', language: 'nl', languageName: 'Belanda' },
    borrowedFrom: [{ word: { lemma: 'الكُحُول', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'via', sourceRef: REF_WIKT } }]
  },
  {
    word: { lemma: 'admiral', language: 'id', languageName: 'Bahasa Indonesia', pos: 'noun', meaning: 'pangkat tertinggi angkatan laut' },
    borrowedFrom: [{ word: { lemma: 'admiraal', language: 'nl', languageName: 'Belanda' }, relation: { mechanism: 'via', period: 'colonial era', sourceRef: REF_JONES } }]
  },
  {
    word: { lemma: 'admiraal', language: 'nl', languageName: 'Belanda' },
    borrowedFrom: [{ word: { lemma: 'أَمِير الْبَحْر', language: 'ar', languageName: 'Arab' }, relation: { mechanism: 'via', phoneticChange: 'amir al-bahr → admiraal', sourceRef: REF_JONES } }]
  },
];