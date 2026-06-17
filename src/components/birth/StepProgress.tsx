interface StepProgressProps {
  current: number
  total: number
  label: string
}

export function StepProgress({ current, total, label }: StepProgressProps) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="step-progress">
      <div className="step-progress__meta">
        <span className="step-progress__label">{label}</span>
        <span className="step-progress__count">
          Langkah {current} / {total}
        </span>
      </div>
      <div className="step-progress__bar" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
        <div className="step-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="step-progress__hint">{pct}% selesai</p>
    </div>
  )
}
