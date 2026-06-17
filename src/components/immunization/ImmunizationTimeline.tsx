import { useImmunization } from '../../context/ImmunizationContext'
import {
  formatDateMs,
  formatDaysUntil,
  getScheduleWithStatus,
} from '../../utils/vaccinationReminder'

export function ImmunizationTimeline() {
  const { birthDate, completedAges } = useImmunization()

  if (!birthDate) {
    return (
      <div className="timeline-empty">
        <p>Masukkan tarikh lahir dalam tab Ringkasan untuk lihat jadual peribadi.</p>
      </div>
    )
  }

  const items = getScheduleWithStatus(birthDate, completedAges)

  return (
    <ol className="timeline">
      {items.map((item, index) => (
        <li
          key={item.entry.age}
          className={`timeline__item timeline__item--${item.status}`}
        >
          <div className="timeline__track">
            <span className="timeline__dot" aria-hidden="true" />
            {index < items.length - 1 && <span className="timeline__line" aria-hidden="true" />}
          </div>
          <article className="timeline__card">
            <div className="timeline__header">
              <h3 className="timeline__age">{item.entry.ageLabel}</h3>
              {item.status === 'completed' && (
                <span className="timeline__status timeline__status--done">Selesai</span>
              )}
              {item.status === 'current' && (
                <span className="timeline__status timeline__status--current">
                  {formatDaysUntil(item.daysUntil)}
                </span>
              )}
            </div>
            <p className="timeline__date">{formatDateMs(item.dueDate)}</p>
            <ul className="timeline__vaccines">
              {item.entry.vaccines.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  )
}
