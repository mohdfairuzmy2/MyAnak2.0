import { PerancanganAnakIcon } from './ServiceIcons'

export function PlanningCard() {
  return (
    <button className="planning-card glass-card" type="button">
      <div className="planning-card__icon glass-icon glass-icon--sm">
        <PerancanganAnakIcon />
      </div>
      <span className="planning-card__label">Perancangan Anak</span>
    </button>
  )
}
