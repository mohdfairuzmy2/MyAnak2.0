import { useImmunization } from '../../context/ImmunizationContext'
import {
  getImmunizationProgress,
  hasUpcomingReminder,
} from '../../utils/vaccinationReminder'

interface FamilySummaryCardProps {
  onViewAll: () => void
}

function FamilyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <circle cx="9" cy="7" r="3" />
      <circle cx="15" cy="7" r="3" />
      <circle cx="12" cy="14" r="2.5" />
      <path d="M4 19c0-2.5 2.2-4.5 5-4.5" strokeLinecap="round" />
      <path d="M20 19c0-2.5-2.2-4.5-5-4.5" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M12 3l7 3.2v4.9c0 4.2-2.8 8-7 9.9-4.2-1.9-7-5.7-7-9.9V6.2L12 3z" />
      <path d="M9 12.1l2.1 2.1 4.4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3.5v3M16 3.5v3M7.5 10H16.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function FamilySummaryCard({ onViewAll }: FamilySummaryCardProps) {
  const { birthDate, nextVaccination, completedAges } = useImmunization()
  const progress = getImmunizationProgress(completedAges)
  const remaining = progress.total - progress.completed
  const hasAppointment = hasUpcomingReminder(nextVaccination) || !!nextVaccination

  return (
    <section className="family-summary">
      <div className="home-section__head">
        <h2 className="home-section__title">Ringkasan Keluarga</h2>
        <button type="button" className="home-section__link" onClick={onViewAll}>
          Lihat semua
        </button>
      </div>

      <div className="family-summary__grid">
        {/* Ahli Keluarga */}
        <article className="family-summary__card">
          <div className="family-summary__icon family-summary__icon--slate" aria-hidden="true">
            <FamilyIcon />
          </div>
          <p className="family-summary__label">Ahli Keluarga</p>
          <p className="family-summary__value">4</p>
        </article>

        {/* Imunisasi Terkini */}
        <article className="family-summary__card">
          <div className="family-summary__icon family-summary__icon--teal" aria-hidden="true">
            <ShieldIcon />
          </div>
          <p className="family-summary__label">Imunisasi Terkini</p>
          <p className="family-summary__value">{birthDate ? `${remaining}` : '--'}</p>
          <p className="family-summary__meta">
            {birthDate ? `${remaining} lagi sehingga seterusnya` : 'Belum aktif'}
          </p>
        </article>

        {/* Janji Temu */}
        <article className="family-summary__card">
          <div className="family-summary__icon family-summary__icon--blue" aria-hidden="true">
            <CalendarIcon />
          </div>
          <p className="family-summary__label">Janji Temu</p>
          <p className="family-summary__value">{hasAppointment ? '1' : '0'}</p>
          <p className="family-summary__meta">
            {hasAppointment ? 'akan datang' : 'Tiada buat masa ini'}
          </p>
        </article>
      </div>
    </section>
  )
}
