import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useImmunizationReminder } from '../hooks/useImmunizationReminder'
import { useUser } from './UserContext'

type ImmunizationContextValue = ReturnType<typeof useImmunizationReminder>

const ImmunizationContext = createContext<ImmunizationContextValue | null>(null)

export function ImmunizationProvider({ children }: { children: ReactNode }) {
  const { family } = useUser()

  const childrenForImmun = useMemo(
    () =>
      family.senaraAnak.map((a) => ({
        id: a.id,
        nama: a.nama,
        tarikhLahir: a.tarikhLahir,
      })),
    [family.senaraAnak],
  )

  const value = useImmunizationReminder(childrenForImmun)

  return <ImmunizationContext.Provider value={value}>{children}</ImmunizationContext.Provider>
}

export function useImmunization() {
  const ctx = useContext(ImmunizationContext)
  if (!ctx) throw new Error('useImmunization must be used within ImmunizationProvider')
  return ctx
}
