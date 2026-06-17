import type { ReactNode } from 'react'
import { StepProgress } from './StepProgress'

interface BirthFormLayoutProps {
  title: string
  subtitle?: string
  step: number
  totalSteps: number
  stepLabel: string
  onBack: () => void
  onCancel: () => void
  children: ReactNode
  footer: ReactNode
}

export function BirthFormLayout({
  title,
  subtitle,
  step,
  totalSteps,
  stepLabel,
  onBack,
  onCancel,
  children,
  footer,
}: BirthFormLayoutProps) {
  return (
    <div className="birth-flow">
      <header className="birth-flow__header">
        <button type="button" className="birth-flow__back" onClick={onBack} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="birth-flow__header-text">
          <p className="birth-flow__step-badge">
            Langkah {step} / {totalSteps}
          </p>
          <p className="birth-flow__eyebrow">Pendaftaran Kelahiran</p>
          <h1 className="birth-flow__title">{title}</h1>
          {subtitle && <p className="birth-flow__subtitle">{subtitle}</p>}
        </div>
        <button type="button" className="birth-flow__cancel" onClick={onCancel}>
          Batal
        </button>
      </header>

      <StepProgress current={step} total={totalSteps} label={stepLabel} />

      <main className="birth-flow__content">{children}</main>

      <footer className="birth-flow__footer">{footer}</footer>
    </div>
  )
}

interface FormActionsProps {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  backLabel?: string
  nextDisabled?: boolean
  showBack?: boolean
}

export function FormActions({
  onBack,
  onNext,
  nextLabel = 'Seterusnya',
  backLabel = 'Kembali',
  nextDisabled,
  showBack = true,
}: FormActionsProps) {
  return (
    <div className="form-actions">
      {showBack && onBack && (
        <button type="button" className="btn btn--secondary" onClick={onBack}>
          {backLabel}
        </button>
      )}
      <button
        type="button"
        className="btn btn--primary"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </button>
    </div>
  )
}
