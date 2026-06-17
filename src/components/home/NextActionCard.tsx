import { useImmunization } from '../../context/ImmunizationContext'
import {
  formatDateMs,
  formatDaysUntil,
  hasUpcomingReminder,
} from '../../utils/vaccinationReminder'

interface NextActionCardProps {
  onImmunization: () => void
}

function MegaphoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M3 11.5V13.5a1 1 0 0 0 1 1h2l4 3V8l-4 3H4a1 1 0 0 0-1 1z" strokeLinejoin="round" />
      <path d="M16 8.5c1.5 1 2.5 2.2 2.5 3.5s-1 2.5-2.5 3.5" strokeLinecap="round" />
      <path d="M19 6c2.2 1.5 3.5 3.3 3.5 6s-1.3 4.5-3.5 6" strokeLinecap="round" />
      <path d="M7 17.5l1 2.5" strokeLinecap="round" />
    </svg>
  )
}

function VaccineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M12 3l7 3.2v4.9c0 4.2-2.8 8-7 9.9-4.2-1.9-7-5.7-7-9.9V6.2L12 3z" strokeLinejoin="round" />
      <path d="M9 12.1l2.1 2.1 4.4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function NextActionCard({ onImmunization }: NextActionCardProps) {
  const { profile, birthDate, nextVaccination } = useImmunization()
  const childName = profile.childName.trim() || 'anak anda'

  let title = 'Tiada makluman baharu'
  let description: string | null = null
  let statusLabel = 'Makluman Penting'
  let variant = 'notice'
  let icon = <MegaphoneIcon />

  if (birthDate && nextVaccination) {
    const isUrgent = hasUpcomingReminder(nextVaccination)
    title = isUrgent
      ? `Vaksin ${nextVaccination.entry.ageLabel} semakin hampir`
      : `Jadual seterusnya untuk ${childName}`
    description = `${formatDaysUntil(nextVaccination.daysUntil)} · ${formatDateMs(nextVaccination.dueDate)} · ${nextVaccination.entry.vaccines[0]}`
    statusLabel = isUrgent ? 'Perlu perhatian' : 'Makluman Kesihatan'
    variant = isUrgent
      ? nextVaccination.status === 'overdue' ? 'overdue' : 'active'
      : 'calm'
    icon = <VaccineIcon />
  } else if (birthDate && !nextVaccination) {
    title = 'Jadual imunisasi lengkap!'
    description = `${childName} telah melengkapkan semua vaksin PIK.`
    statusLabel = 'Tahniah'
    variant = 'complete'
    icon = <VaccineIcon />
  }

  return (
    <button
      type="button"
      className={`makluman-card makluman-card--${variant}`}
      onClick={onImmunization}
      aria-label={statusLabel}
    >
      <div className="makluman-card__icon" aria-hidden="true">
        {icon}
      </div>
      <div className="makluman-card__body">
        <p className="makluman-card__label">{statusLabel}</p>
        <h2 className="makluman-card__title">{title}</h2>
        {description && <p className="makluman-card__desc">{description}</p>}
      </div>
      <span className="makluman-card__arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  )
}
