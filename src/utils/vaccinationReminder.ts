import { IMMUNIZATION_SCHEDULE, type ScheduleEntry } from '../data/immunizationSchedule'

export interface ImmunizationProfile {
  childName: string
  birthDate: string
  remindersEnabled: boolean
}

export interface NextVaccination {
  entry: ScheduleEntry
  dueDate: Date
  daysUntil: number
  status: 'upcoming' | 'due' | 'overdue'
}

const MS_PER_DAY = 86_400_000

export function parseBirthDate(isoDate: string): Date | null {
  if (!isoDate) return null
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return null
  const date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null
  }
  return date
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export function getDueDate(birthDate: Date, monthsOffset: number): Date {
  if (monthsOffset === 0) return new Date(birthDate)
  return addMonths(birthDate, monthsOffset)
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getDaysUntil(target: Date, from = new Date()): number {
  const diff = startOfDay(target).getTime() - startOfDay(from).getTime()
  return Math.round(diff / MS_PER_DAY)
}

export function getNextVaccination(
  birthDate: Date,
  completedAges: string[] = [],
): NextVaccination | null {
  const completed = new Set(completedAges)
  const today = startOfDay(new Date())

  for (const entry of IMMUNIZATION_SCHEDULE) {
    if (completed.has(entry.age)) continue

    const dueDate = startOfDay(getDueDate(birthDate, entry.monthsOffset))
    const daysUntil = getDaysUntil(dueDate, today)

    let status: NextVaccination['status'] = 'upcoming'
    if (daysUntil === 0) status = 'due'
    else if (daysUntil < 0) status = 'overdue'

    return { entry, dueDate, daysUntil, status }
  }

  return null
}

export function formatDateMs(date: Date): string {
  return date.toLocaleDateString('ms-MY', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDaysUntil(daysUntil: number): string {
  if (daysUntil === 0) return 'Hari ini'
  if (daysUntil === 1) return 'Esok'
  if (daysUntil > 1) return `${daysUntil} hari lagi`
  if (daysUntil === -1) return 'Semalam (lewat)'
  return `${Math.abs(daysUntil)} hari lewat`
}

export const REMINDER_NOTIFY_DAYS_BEFORE = 7

export function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat pagi'
  if (hour < 15) return 'Selamat tengah hari'
  if (hour < 19) return 'Selamat petang'
  return 'Selamat malam'
}

export function getChildAgeLabel(birthDate: Date): string {
  const today = startOfDay(new Date())
  const birth = startOfDay(birthDate)
  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth())
  if (today.getDate() < birth.getDate()) months -= 1

  if (months < 1) {
    const days = getDaysUntil(today, birth)
    if (days <= 0) return 'baru lahir'
    if (days === 1) return '1 hari'
    return `${days} hari`
  }
  if (months < 24) return `${months} bulan`
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (rem === 0) return `${years} tahun`
  return `${years} tahun ${rem} bulan`
}

export function getImmunizationProgress(completedAges: string[]) {
  return {
    completed: completedAges.length,
    total: IMMUNIZATION_SCHEDULE.length,
    percent: Math.round((completedAges.length / IMMUNIZATION_SCHEDULE.length) * 100),
  }
}

export type ScheduleItemStatus = 'completed' | 'current' | 'upcoming'

export interface ScheduleItemWithStatus {
  entry: ScheduleEntry
  dueDate: Date
  status: ScheduleItemStatus
  daysUntil: number
}

export function getScheduleWithStatus(
  birthDate: Date,
  completedAges: string[],
): ScheduleItemWithStatus[] {
  const completed = new Set(completedAges)
  const next = getNextVaccination(birthDate, completedAges)
  const today = startOfDay(new Date())

  return IMMUNIZATION_SCHEDULE.map((entry) => {
    const dueDate = startOfDay(getDueDate(birthDate, entry.monthsOffset))
    const daysUntil = getDaysUntil(dueDate, today)

    if (completed.has(entry.age)) {
      return { entry, dueDate, status: 'completed' as const, daysUntil }
    }
    if (next?.entry.age === entry.age) {
      return { entry, dueDate, status: 'current' as const, daysUntil }
    }
    return { entry, dueDate, status: 'upcoming' as const, daysUntil }
  })
}

export function hasUpcomingReminder(
  next: NextVaccination | null,
  withinDays = REMINDER_NOTIFY_DAYS_BEFORE,
): boolean {
  if (!next) return false
  return next.daysUntil <= withinDays && next.daysUntil >= -14
}

