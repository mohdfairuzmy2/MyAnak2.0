export interface VaccineInfo {
  code: string
  name: string
  prevents: string
}

export interface ScheduleEntry {
  age: string
  ageLabel: string
  /** Bulan selepas kelahiran (0 = kelahiran) */
  monthsOffset: number
  vaccines: string[]
}

export const PIK_SUMMARY =
  'Di bawah Program Imunisasi Kebangsaan (PIK), setiap bayi di Malaysia akan menerima suntikan vaksin secara percuma mengikut jadual KKM bermula seawal kelahiran sehingga umur 18 bulan.'

export const PIK_STATS = '10 jenis vaksin percuma · 13 penyakit cegahan vaksin'

export const WHY_VACCINATE = [
  {
    title: 'Cegah Penyakit Berjangkit',
    description:
      'Melindungi daripada TB, Hepatitis B, Difteria, Tetanus, Pertussis (batuk kokol) dan polio.',
  },
  {
    title: 'Imuniti Kelompok',
    description: 'Meningkatkan herd immunity dalam kalangan masyarakat.',
  },
  {
    title: 'Kurangkan Kematian & Kecacatan',
    description: 'Mengurangkan kadar kematian dan kecacatan akibat penyakit boleh cegah vaksin.',
  },
]

export const VACCINES: VaccineInfo[] = [
  { code: 'BCG', name: 'BCG', prevents: 'Penyakit batuk kering (TB)' },
  { code: 'HEP_B', name: 'Hepatitis B', prevents: 'Jangkitan Hepatitis B pada hati' },
  { code: 'DTP', name: 'DTP', prevents: 'Difteria, Tetanus dan Pertussis (batuk kokol)' },
  { code: 'IPV', name: 'Polio (IPV)', prevents: 'Lumpuh akibat virus polio' },
  { code: 'HIB', name: 'Hib', prevents: 'Jangkitan Haemophilus Influenzae type B' },
  { code: 'MMR', name: 'MMR', prevents: 'Campak, Beguk (Mumps) dan Rubella' },
  { code: 'PCV', name: 'Pneumokokal (PCV)', prevents: 'Jangkitan paru-paru dan meningitis' },
  { code: 'JE', name: 'Encephalitis Japanese (JE)', prevents: 'Demam encephalitis Japanese' },
]

/** Jadual imunisasi bayi & kanak-kanak mengikut garis panduan PIK KKM */
export const IMMUNIZATION_SCHEDULE: ScheduleEntry[] = [
  {
    age: 'birth',
    ageLabel: 'Kelahiran',
    monthsOffset: 0,
    vaccines: ['BCG', 'Hepatitis B (dos 1)'],
  },
  {
    age: '1m',
    ageLabel: '1 Bulan',
    monthsOffset: 1,
    vaccines: ['Hepatitis B (dos 2)'],
  },
  {
    age: '2m',
    ageLabel: '2 Bulan',
    monthsOffset: 2,
    vaccines: ['DTaP-IPV-Hib (dos 1)', 'Pneumokokal PCV (dos 1)'],
  },
  {
    age: '3m',
    ageLabel: '3 Bulan',
    monthsOffset: 3,
    vaccines: ['DTaP-IPV-Hib (dos 2)', 'Pneumokokal PCV (dos 2)'],
  },
  {
    age: '4m',
    ageLabel: '4 Bulan',
    monthsOffset: 4,
    vaccines: ['DTaP-IPV-Hib (dos 3)'],
  },
  {
    age: '6m',
    ageLabel: '6 Bulan',
    monthsOffset: 6,
    vaccines: ['Hepatitis B (dos 3)', 'DTaP-IPV-Hib (dos 4)'],
  },
  {
    age: '12m',
    ageLabel: '12 Bulan',
    monthsOffset: 12,
    vaccines: ['MMR (dos 1)', 'Pneumokokal PCV (booster)'],
  },
  {
    age: '18m',
    ageLabel: '18 Bulan',
    monthsOffset: 18,
    vaccines: ['DTaP-IPV-Hib (booster)', 'MMR (dos 2)', 'JE (dos 1)*'],
  },
]

export const IMMUNIZATION_NOTES = [
  'Semua vaksin berdaftar, selamat, dan diluluskan oleh Bahagian Regulatori Farmasi Negara (NPRA).',
  'Simpan buku rekod kesihatan anak dengan baik — rekod imunisasi diperlukan semasa pendaftaran sekolah rendah.',
  '* Vaksin JE diberikan di kawasan endemik mengikut nasihat KKM setempat.',
]

export const OFFICIAL_SOURCE = {
  title: 'Program Imunisasi Bayi dan Kanak-kanak',
  url: 'https://www.malaysia.gov.my/my/personas/ibu-hamil/postnatal-care/program-imunisasi-bayi-dan-kanak-kanak',
  updated: '28/1/2026',
}
