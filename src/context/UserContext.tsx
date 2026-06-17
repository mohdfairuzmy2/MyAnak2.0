import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import type { Anak, EditableProfile, FamilyData, GuardianProfile, Pasangan } from '../types/user'

/* ── Simulated JPN fetch ── */
const MOCK_JPN_DATA: GuardianProfile['jpn'] = {
  nama: 'MOHD FAIRUZ BIN ABDULLAH',
  noKad: '850412-14-5231',
  umur: 40,
  jantina: 'lelaki',
}

const DEFAULT_EDITABLE: EditableProfile = {
  telefon: '',
  alamat: '',
  poskod: '',
  bandar: '',
  negeri: '',
}

const DEFAULT_PROFILE: GuardianProfile = {
  jpn: MOCK_JPN_DATA,
  editable: DEFAULT_EDITABLE,
  peranan: 'bapa',
}

const DEFAULT_FAMILY: FamilyData = {
  pasangan: null,
  senaraAnak: [],
}

const PROFILE_KEY = 'myanak_guardian_profile'
const FAMILY_KEY = 'myanak_family_data'

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function saveJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

function generateId() {
  return `anak_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

/* ── Context shape ── */
interface UserContextValue {
  profile: GuardianProfile
  family: FamilyData
  updateEditable: (patch: Partial<EditableProfile>) => void
  updatePeranan: (peranan: GuardianProfile['peranan']) => void
  updatePasangan: (pasangan: Pasangan | null) => void
  addAnak: (anak: Omit<Anak, 'id'>) => string
  updateAnak: (id: string, patch: Partial<Omit<Anak, 'id'>>) => void
  removeAnak: (id: string) => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<GuardianProfile>(() =>
    loadJson(PROFILE_KEY, DEFAULT_PROFILE),
  )
  const [family, setFamily] = useState<FamilyData>(() =>
    loadJson(FAMILY_KEY, DEFAULT_FAMILY),
  )

  const updateEditable = useCallback((patch: Partial<EditableProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, editable: { ...prev.editable, ...patch } }
      saveJson(PROFILE_KEY, next)
      return next
    })
  }, [])

  const updatePeranan = useCallback((peranan: GuardianProfile['peranan']) => {
    setProfile((prev) => {
      const next = { ...prev, peranan }
      saveJson(PROFILE_KEY, next)
      return next
    })
  }, [])

  const updatePasangan = useCallback((pasangan: Pasangan | null) => {
    setFamily((prev) => {
      const next = { ...prev, pasangan }
      saveJson(FAMILY_KEY, next)
      return next
    })
  }, [])

  const addAnak = useCallback((anak: Omit<Anak, 'id'>): string => {
    const id = generateId()
    setFamily((prev) => {
      const next = { ...prev, senaraAnak: [...prev.senaraAnak, { ...anak, id }] }
      saveJson(FAMILY_KEY, next)
      return next
    })
    return id
  }, [])

  const updateAnak = useCallback((id: string, patch: Partial<Omit<Anak, 'id'>>) => {
    setFamily((prev) => {
      const next = {
        ...prev,
        senaraAnak: prev.senaraAnak.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }
      saveJson(FAMILY_KEY, next)
      return next
    })
  }, [])

  const removeAnak = useCallback((id: string) => {
    setFamily((prev) => {
      const next = { ...prev, senaraAnak: prev.senaraAnak.filter((a) => a.id !== id) }
      saveJson(FAMILY_KEY, next)
      return next
    })
  }, [])

  return (
    <UserContext.Provider
      value={{
        profile,
        family,
        updateEditable,
        updatePeranan,
        updatePasangan,
        addAnak,
        updateAnak,
        removeAnak,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
