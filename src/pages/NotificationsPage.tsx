import { useImmunization } from '../context/ImmunizationContext'
import {
  formatDateMs,
  formatDaysUntil,
  hasUpcomingReminder,
} from '../utils/vaccinationReminder'

interface NotificationsPageProps {
  onImmunization: () => void
}

export function NotificationsPage({ onImmunization }: NotificationsPageProps) {
  const { profile, birthDate, nextVaccination, permission } = useImmunization()

  return (
    <main className="tab-page">
      <header className="tab-page__header">
        <h1 className="tab-page__title">Notifikasi</h1>
        <p className="tab-page__subtitle">Peringatan dan kemas kini penting</p>
      </header>

      {!birthDate && (
        <div className="empty-state">
          <div className="empty-state__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="empty-state__title">Tiada peringatan lagi</p>
          <p className="empty-state__text">
            Tambah tarikh lahir anak untuk menerima peringatan vaksin PIK.
          </p>
          <button type="button" className="empty-state__cta" onClick={onImmunization}>
            Tetapkan di Imunisasi
          </button>
        </div>
      )}

      {birthDate && nextVaccination && (
        <article
          className={`notif-card notif-card--${nextVaccination.status}`}
        >
          <div className="notif-card__icon" aria-hidden="true">💉</div>
          <div className="notif-card__body">
            <p className="notif-card__tag">
              {hasUpcomingReminder(nextVaccination) ? 'Aktif' : 'Akan datang'}
            </p>
            <h2 className="notif-card__title">
              Vaksin {nextVaccination.entry.ageLabel}
              {profile.childName.trim() ? ` · ${profile.childName.trim()}` : ''}
            </h2>
            <p className="notif-card__meta">
              {formatDaysUntil(nextVaccination.daysUntil)} · {formatDateMs(nextVaccination.dueDate)}
            </p>
            <ul className="notif-card__list">
              {nextVaccination.entry.vaccines.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </div>
        </article>
      )}

      {birthDate && !nextVaccination && (
        <div className="empty-state empty-state--success">
          <p className="empty-state__title">Semua vaksin selesai</p>
          <p className="empty-state__text">Jadual PIK 18 bulan telah lengkap.</p>
        </div>
      )}

      {birthDate && (
        <p className="tab-page__footnote">
          Notifikasi pelayar:{' '}
          {permission === 'granted'
            ? 'Diaktifkan'
            : permission === 'denied'
              ? 'Disekat'
              : 'Belum dibenarkan'}
          . Urus dalam tab Imunisasi → Ringkasan.
        </p>
      )}
    </main>
  )
}
