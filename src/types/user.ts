/** Data dari JPN — baca sahaja */
export interface JpnData {
  nama: string
  noKad: string
  umur: number
  jantina: 'lelaki' | 'perempuan'
}

/** Maklumat yang boleh dikemaskini oleh pengguna */
export interface EditableProfile {
  telefon: string
  alamat: string
  poskod: string
  bandar: string
  negeri: string
  lat?: number
  lng?: number
}

/** Profil penjaga lengkap */
export interface GuardianProfile {
  jpn: JpnData
  editable: EditableProfile
  peranan: 'bapa' | 'ibu' | 'penjaga'
}

/** Ahli keluarga — pasangan */
export interface Pasangan {
  nama: string
  noKad: string
}

/** Anak */
export interface Anak {
  id: string
  nama: string
  noKad: string
  tarikhLahir: string
  jantina: 'lelaki' | 'perempuan'
}

/** Data keluarga penuh */
export interface FamilyData {
  pasangan: Pasangan | null
  senaraAnak: Anak[]
}
