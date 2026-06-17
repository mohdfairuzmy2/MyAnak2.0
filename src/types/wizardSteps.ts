export const TOTAL_STEPS = 7

export const WIZARD_STEPS = [
  { key: 'terms', title: 'Terma & Syarat', label: 'Terma & Syarat' },
  { key: 'mother', title: 'Maklumat Ibu', label: 'Maklumat Ibu' },
  { key: 'birth', title: 'Maklumat Kelahiran', label: 'Maklumat Kelahiran' },
  { key: 'marriage-father', title: 'Perkahwinan & Bapa', label: 'Maklumat Perkahwinan & Bapa' },
  { key: 'child', title: 'Maklumat Anak', label: 'Maklumat Anak' },
  { key: 'applicant', title: 'Maklumat Pemohon', label: 'Maklumat Pemohon' },
  { key: 'confirm', title: 'Pengesahan', label: 'Semak & Hantar' },
] as const

export type WizardStepKey = (typeof WIZARD_STEPS)[number]['key']
