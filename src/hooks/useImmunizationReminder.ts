import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  formatDateMs,
  getNextVaccination,
  parseBirthDate,
  REMINDER_NOTIFY_DAYS_BEFORE,
  type NextVaccination,
} from '../utils/vaccinationReminder'

/* ── Per-child immunization record ── */
export interface ChildImmunRecord {
  childId: string
  completedAges: string[]
  notifiedAges: string[]
  remindersEnabled: boolean
}

const IMMUN_KEY = 'myanak_immun_records_v2'
const ACTIVE_CHILD_KEY = 'myanak_active_child'

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

async function showVaccinationNotification(
  next: NextVaccination,
  childName: string,
): Promise<void> {
  if (!('Notification' in window) || Notification.permission !== 'granted') return
  const name = childName.trim() || 'anak anda'
  const vaccines = next.entry.vaccines.join(', ')
  const body =
    next.daysUntil === 0
      ? `Hari ini: ${next.entry.ageLabel} — ${vaccines}`
      : next.daysUntil > 0
        ? `${formatDateMs(next.dueDate)} — ${vaccines}`
        : `Lewat ${Math.abs(next.daysUntil)} hari — ${next.entry.ageLabel}`
  const iconUrl = `${import.meta.env.BASE_URL}favicon.svg`
  const registration = await navigator.serviceWorker?.ready
  if (registration) {
    await registration.showNotification('Peringatan Imunisasi MyAnak', {
      body: `${name}: ${body}`,
      icon: iconUrl,
      badge: iconUrl,
      tag: `vaccine-${next.entry.age}-${childName}`,
      data: { url: import.meta.env.BASE_URL },
    })
    return
  }
  new Notification('Peringatan Imunisasi MyAnak', {
    body: `${name}: ${body}`,
    icon: iconUrl,
    tag: `vaccine-${next.entry.age}-${childName}`,
  })
}

/* ── Hook ── */
export interface ChildForImmun {
  id: string
  nama: string
  tarikhLahir: string
}

export function useImmunizationReminder(children: ChildForImmun[] = []) {
  const [records, setRecords] = useState<Record<string, ChildImmunRecord>>(() =>
    loadJson(IMMUN_KEY, {}),
  )
  const [activeChildId, setActiveChildId] = useState<string>(() =>
    loadJson(ACTIVE_CHILD_KEY, children[0]?.id ?? ''),
  )
  const [permission, setPermission] = useState<NotificationPermission>(() =>
    'Notification' in window ? Notification.permission : 'denied',
  )

  /* Auto-select first child if none selected */
  useEffect(() => {
    if (!activeChildId && children.length > 0) {
      setActiveChildId(children[0].id)
      saveJson(ACTIVE_CHILD_KEY, children[0].id)
    }
  }, [activeChildId, children])

  const activeChild = useMemo(
    () => children.find((c) => c.id === activeChildId) ?? children[0] ?? null,
    [children, activeChildId],
  )

  const getRecord = useCallback(
    (id: string): ChildImmunRecord =>
      records[id] ?? { childId: id, completedAges: [], notifiedAges: [], remindersEnabled: false },
    [records],
  )

  const activeRecord = useMemo(
    () => (activeChild ? getRecord(activeChild.id) : null),
    [activeChild, getRecord],
  )

  const birthDate = useMemo(
    () => (activeChild ? parseBirthDate(activeChild.tarikhLahir) : null),
    [activeChild],
  )

  const nextVaccination = useMemo(() => {
    if (!birthDate || !activeRecord) return null
    return getNextVaccination(birthDate, activeRecord.completedAges)
  }, [birthDate, activeRecord])

  const patchRecord = useCallback((id: string, patch: Partial<ChildImmunRecord>) => {
    setRecords((prev) => {
      const existing = prev[id] ?? {
        childId: id,
        completedAges: [],
        notifiedAges: [],
        remindersEnabled: false,
      }
      const next = { ...prev, [id]: { ...existing, ...patch } }
      saveJson(IMMUN_KEY, next)
      return next
    })
  }, [])

  const selectChild = useCallback((id: string) => {
    setActiveChildId(id)
    saveJson(ACTIVE_CHILD_KEY, id)
  }, [])

  const markCompleted = useCallback(
    (age: string, childId?: string) => {
      const id = childId ?? activeChild?.id
      if (!id) return
      const rec = getRecord(id)
      if (rec.completedAges.includes(age)) return
      patchRecord(id, { completedAges: [...rec.completedAges, age] })
    },
    [activeChild, getRecord, patchRecord],
  )

  const markUncompleted = useCallback(
    (age: string, childId?: string) => {
      const id = childId ?? activeChild?.id
      if (!id) return
      const rec = getRecord(id)
      patchRecord(id, { completedAges: rec.completedAges.filter((a) => a !== age) })
    },
    [activeChild, getRecord, patchRecord],
  )

  const toggleReminders = useCallback(
    async (enabled: boolean, childId?: string) => {
      const id = childId ?? activeChild?.id
      if (!id) return
      if (!enabled) {
        patchRecord(id, { remindersEnabled: false })
        return
      }
      if (permission === 'granted') {
        patchRecord(id, { remindersEnabled: true })
        return
      }
      if (!('Notification' in window)) return
      const result = await Notification.requestPermission()
      setPermission(result)
      patchRecord(id, { remindersEnabled: result === 'granted' })
    },
    [activeChild, permission, patchRecord],
  )

  const checkAndNotify = useCallback(async () => {
    if (!activeChild || !activeRecord?.remindersEnabled || permission !== 'granted') return
    if (!nextVaccination) return
    if (activeRecord.notifiedAges.includes(nextVaccination.entry.age)) return
    const shouldNotify =
      nextVaccination.daysUntil <= REMINDER_NOTIFY_DAYS_BEFORE && nextVaccination.daysUntil >= -14
    if (!shouldNotify) return
    await showVaccinationNotification(nextVaccination, activeChild.nama)
    patchRecord(activeChild.id, {
      notifiedAges: [...activeRecord.notifiedAges, nextVaccination.entry.age],
    })
  }, [activeChild, activeRecord, permission, nextVaccination, patchRecord])

  useEffect(() => {
    void checkAndNotify()
  }, [checkAndNotify])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') void checkAndNotify()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [checkAndNotify])

  /* Legacy compat — single-child consumers */
  const profile = useMemo(
    () => ({
      childName: activeChild?.nama ?? '',
      birthDate: activeChild?.tarikhLahir ?? '',
      remindersEnabled: activeRecord?.remindersEnabled ?? false,
    }),
    [activeChild, activeRecord],
  )

  return {
    /* multi-child */
    activeChild,
    activeRecord,
    records,
    selectChild,
    getRecord,
    markCompleted,
    markUncompleted,
    toggleReminders,
    permission,
    nextVaccination,
    birthDate,
    /* legacy compat */
    profile,
    completedAges: activeRecord?.completedAges ?? [],
    updateProfile: () => {},
  }
}
