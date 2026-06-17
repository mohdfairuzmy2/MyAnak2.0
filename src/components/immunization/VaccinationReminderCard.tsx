import { useImmunization } from '../../context/ImmunizationContext'
import {
  formatDateMs,
  formatDaysUntil,
  getImmunizationProgress,
} from '../../utils/vaccinationReminder'

export function VaccinationReminderCard() {
  const {
    profile,
    birthDate,
    nextVaccination,
    permission,
    completedAges,
    markCompleted,
    toggleReminders,
  } = useImmunization()

  const notificationsSupported = 'Notification' in window
  const progress = getImmunizationProgress(completedAges)

  if (!birthDate) {
    return (
      <section className="info-section">
        <div className="reminder-setup">
          <div className="reminder-setup__hero">
            <div className="reminder-setup__ring" aria-hidden="true">
              <svg viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" className="progress-ring__bg" />
              </svg>
              <span className="reminder-setup__emoji">💉</span>
            </div>
            <h2 className="reminder-setup__title">Belum ada maklumat anak</h2>
            <p className="reminder-setup__desc">
              Tambah anak dan tarikh lahir di tab Profil. Kami akan kira jadual
              vaksin PIK dan hantar peringatan tepat pada masanya.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="info-section">
      <div className="reminder-summary">
        <div className="reminder-summary__top">
          <div className="reminder-summary__ring" aria-hidden="true">
            <svg viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="30" className="progress-ring__bg" />
              <circle
                cx="36"
                cy="36"
                r="30"
                className="progress-ring__fill"
                style={{
                  strokeDasharray: `${(progress.completed / progress.total) * 188.5} 188.5`,
                }}
              />
            </svg>
            <span className="reminder-summary__percent">{progress.percent}%</span>
          </div>
          <div>
            <p className="reminder-summary__label">Kemajuan imunisasi</p>
            <p className="reminder-summary__stat">
              {progress.completed} / {progress.total} fasa selesai
            </p>
          </div>
        </div>

        {notificationsSupported && (
          <label className="reminder-toggle">
            <input
              type="checkbox"
              checked={profile.remindersEnabled}
              onChange={(e) => void toggleReminders(e.target.checked)}
            />
            <span className="reminder-toggle__track" aria-hidden="true" />
            <span className="reminder-toggle__text">Aktifkan notifikasi peringatan</span>
          </label>
        )}

        {notificationsSupported && permission === 'denied' && (
          <p className="reminder-hint reminder-hint--warn">
            Notifikasi disekat. Benarkan dalam tetapan pelayar.
          </p>
        )}

        {profile.remindersEnabled && permission === 'default' && notificationsSupported && (
          <button
            type="button"
            className="reminder-enable-btn"
            onClick={() => void toggleReminders(true)}
          >
            Benarkan notifikasi
          </button>
        )}

        {nextVaccination && (
          <div className={`reminder-next reminder-next--${nextVaccination.status}`}>
            <div className="reminder-next__header">
              <span className="reminder-next__badge">{nextVaccination.entry.ageLabel}</span>
              <span className="reminder-next__countdown">
                {formatDaysUntil(nextVaccination.daysUntil)}
              </span>
            </div>
            <p className="reminder-next__date">{formatDateMs(nextVaccination.dueDate)}</p>
            <ul className="reminder-next__vaccines">
              {nextVaccination.entry.vaccines.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
            {nextVaccination.status === 'overdue' && (
              <p className="reminder-next__alert">
                Tarikh vaksin telah berlalu. Sila ke klinik kesihatan atau hospital terdekat.
              </p>
            )}
            <button
              type="button"
              className="reminder-next__done"
              onClick={() => markCompleted(nextVaccination.entry.age)}
            >
              Tandakan selesai ✓
            </button>
          </div>
        )}

        {!nextVaccination && (
          <div className="reminder-complete">
            <p className="reminder-complete__title">Tahniah!</p>
            <p className="reminder-complete__text">
              Jadual imunisasi PIK (18 bulan) untuk{' '}
              {profile.childName.trim() || 'anak anda'} telah lengkap.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
