import { useState, useCallback, useEffect } from 'react'
import type { BirthRegistrationForm } from '../types/birthRegistration'
import { initialForm } from '../types/birthRegistration'
import { WIZARD_STEPS, TOTAL_STEPS, type WizardStepKey } from '../types/wizardSteps'
import { BirthFormLayout, FormActions } from '../components/birth/BirthFormLayout'
import { TermsContent } from '../components/birth/TermsStep'
import { MotherStep, BirthInfoStep, MarriageFatherStep } from '../components/birth/FormSteps'
import { ChildStep, ApplicantStep, ConfirmStep, SuccessStep } from '../components/birth/ApplicantSteps'

/* ── Draft persistence ── */
const DRAFT_KEY = 'myanak_birth_draft'

interface DraftData {
  form: BirthRegistrationForm
  stepIndex: number
  savedAt: string // ISO string
}

function saveDraft(form: BirthRegistrationForm, stepIndex: number) {
  const draft: DraftData = { form, stepIndex, savedAt: new Date().toISOString() }
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

function loadDraft(): DraftData | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as DraftData) : null
  } catch {
    return null
  }
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY)
}

function formatSavedAt(iso: string): string {
  const d = new Date(iso)
  const today = new Date()
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  const time = d.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })
  if (isToday) return `Hari ini, ${time}`
  const date = d.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long' })
  return `${date}, ${time}`
}

/* ── Step validation ── */
function validateStep(key: WizardStepKey, form: BirthRegistrationForm): string | null {
  switch (key) {
    case 'terms':
      return null
    case 'mother':
      if (!form.motherIdType || !form.motherIdNumber || !form.motherFullName)
        return 'Sila lengkapkan maklumat pengenalan dan nama ibu.'
      if (!form.motherAddress1 || !form.motherPostcode || !form.motherState || !form.motherPhone)
        return 'Sila lengkapkan alamat dan telefon ibu.'
      break
    case 'birth':
      if (!form.isMultipleBirth || !form.birthDateFrom || !form.birthPlace1 || !form.birthState)
        return 'Sila lengkapkan maklumat kelahiran.'
      break
    case 'marriage-father':
      if (!form.marriageDate || !form.marriageState || !form.marriageRegNumber)
        return 'Sila lengkapkan maklumat perkahwinan.'
      if (!form.fatherIdType || !form.fatherIdNumber || !form.fatherFullName)
        return 'Sila lengkapkan maklumat bapa.'
      break
    case 'child':
      for (const child of form.children)
        if (!child.name || !child.gender || !child.birthDate || !child.weight || !child.length)
          return 'Sila lengkapkan maklumat semua anak.'
      break
    case 'applicant':
      if (!form.applicantIdNumber || !form.applicantFullName || !form.applicantEmail)
        return 'Sila lengkapkan maklumat pemohon.'
      break
    default:
      break
  }
  return null
}

function generateRefNo() {
  const y = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 900000 + 100000)
  return `JPN-${y}-${seq}`
}

/* ── Resume draft screen ── */
function ResumeDraftScreen({
  draft,
  onResume,
  onNew,
  onExit,
}: {
  draft: DraftData
  onResume: () => void
  onNew: () => void
  onExit: () => void
}) {
  const stepLabel = WIZARD_STEPS[draft.stepIndex]?.label ?? 'Langkah 1'
  const stepNum = draft.stepIndex + 1

  return (
    <div className="birth-flow birth-draft-screen">
      <header className="birth-flow__header">
        <button type="button" className="birth-flow__back" onClick={onExit} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="birth-flow__header-text">
          <p className="birth-flow__eyebrow">Pendaftaran Kelahiran</p>
          <h1 className="birth-flow__title">Sambung Permohonan</h1>
        </div>
      </header>

      <div className="draft-resume">
        <div className="draft-resume__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <rect width="48" height="48" rx="16" fill="#e0f7f7"/>
            <path d="M14 10h14l10 10v20a2 2 0 01-2 2H14a2 2 0 01-2-2V12a2 2 0 012-2z" fill="#0ea5a8" fillOpacity="0.2" stroke="#0ea5a8" strokeWidth="1.5"/>
            <path d="M28 10v10h10" stroke="#0ea5a8" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M19 26h10M19 31h7" stroke="#0ea5a8" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="34" cy="34" r="7" fill="#0ea5a8"/>
            <path d="M31 34l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="draft-resume__title">Draf Ditemui</h2>
        <p className="draft-resume__desc">
          Anda ada permohonan yang belum siap. Sambung dari mana anda berhenti?
        </p>

        <div className="draft-resume__info-card">
          <div className="draft-resume__info-row">
            <span className="draft-resume__info-label">Langkah terakhir</span>
            <span className="draft-resume__info-value draft-resume__info-value--step">
              {stepNum} / {TOTAL_STEPS} — {stepLabel}
            </span>
          </div>
          <div className="draft-resume__info-row">
            <span className="draft-resume__info-label">Disimpan pada</span>
            <span className="draft-resume__info-value">{formatSavedAt(draft.savedAt)}</span>
          </div>
        </div>

        <div className="draft-resume__actions">
          <button type="button" className="btn btn--primary draft-resume__btn-main" onClick={onResume}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M5 10l4 4 6-8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sambung Permohonan
          </button>
          <button type="button" className="btn btn--secondary draft-resume__btn-new" onClick={onNew}>
            Mulai Baharu
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Save toast ── */
function SaveToast({ visible, savedAt }: { visible: boolean; savedAt: string }) {
  return (
    <div className={`draft-toast ${visible ? 'draft-toast--show' : ''}`} aria-live="polite">
      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
        <circle cx="10" cy="10" r="8" fill="#0ea5a8"/>
        <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Draf disimpan · {savedAt ? formatSavedAt(savedAt) : ''}</span>
    </div>
  )
}

/* ── Main flow ── */
type Mode = 'check-draft' | 'form'

interface BirthRegistrationFlowProps {
  onExit: () => void
}

export function BirthRegistrationFlow({ onExit }: BirthRegistrationFlowProps) {
  const [mode, setMode] = useState<Mode>(() => (loadDraft() ? 'check-draft' : 'form'))
  const [draft] = useState<DraftData | null>(() => loadDraft())
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<BirthRegistrationForm>({ ...initialForm })
  const [referenceNo, setReferenceNo] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [savedAt, setSavedAt] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastTimer, setToastTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const update = useCallback((patch: Partial<BirthRegistrationForm>) => {
    setForm((prev) => ({ ...prev, ...patch }))
    setError(null)
  }, [])

  /* Show toast for 3 seconds */
  const showToast = useCallback(() => {
    if (toastTimer) clearTimeout(toastTimer)
    setToastVisible(true)
    const t = setTimeout(() => setToastVisible(false), 3000)
    setToastTimer(t)
  }, [toastTimer])

  /* Save draft handler */
  const handleSaveDraft = useCallback(() => {
    saveDraft(form, stepIndex)
    const now = new Date().toISOString()
    setSavedAt(now)
    showToast()
  }, [form, stepIndex, showToast])

  /* Auto-save every time form or stepIndex changes (debounced to avoid spamming localStorage) */
  useEffect(() => {
    if (mode !== 'form' || submitted) return
    const t = setTimeout(() => {
      saveDraft(form, stepIndex)
    }, 800)
    return () => clearTimeout(t)
  }, [form, stepIndex, mode, submitted])

  /* Cleanup timer on unmount */
  useEffect(() => () => { if (toastTimer) clearTimeout(toastTimer) }, [toastTimer])

  /* Resume draft */
  const handleResume = () => {
    if (!draft) return
    setForm({ ...draft.form })
    setStepIndex(draft.stepIndex)
    setMode('form')
  }

  /* Start new — clear draft */
  const handleNew = () => {
    clearDraft()
    setForm({ ...initialForm })
    setStepIndex(0)
    setMode('form')
  }

  /* ── Resume screen ── */
  if (mode === 'check-draft' && draft) {
    return (
      <ResumeDraftScreen
        draft={draft}
        onResume={handleResume}
        onNew={handleNew}
        onExit={onExit}
      />
    )
  }

  /* ── Success screen ── */
  if (submitted) {
    clearDraft()
    return <SuccessStep referenceNo={referenceNo} onDone={onExit} />
  }

  /* ── Form ── */
  const currentStep = WIZARD_STEPS[stepIndex]
  const stepNumber = stepIndex + 1
  const isTerms = currentStep.key === 'terms'
  const isConfirm = currentStep.key === 'confirm'

  const handleNext = () => {
    const err = validateStep(currentStep.key, form)
    if (err) { setError(err); return }
    if (stepIndex < WIZARD_STEPS.length - 1) {
      setStepIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setReferenceNo(generateRefNo())
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    setError(null)
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onExit()
    }
  }

  const renderStep = () => {
    switch (currentStep.key) {
      case 'terms': return <TermsContent />
      case 'mother': return <MotherStep form={form} update={update} />
      case 'birth': return <BirthInfoStep form={form} update={update} />
      case 'marriage-father': return <MarriageFatherStep form={form} update={update} />
      case 'child': return <ChildStep form={form} update={update} />
      case 'applicant': return <ApplicantStep form={form} update={update} />
      case 'confirm': return <ConfirmStep form={form} />
      default: return null
    }
  }

  /* Footer with save draft button */
  const footer = isTerms ? (
    <div className="form-actions form-actions--terms">
      <button type="button" className="btn btn--secondary" onClick={onExit}>Tidak Setuju</button>
      <button type="button" className="btn btn--primary" onClick={handleNext}>Setuju & Teruskan</button>
    </div>
  ) : (
    <div className="birth-footer-stack">
      {/* Save draft button — not shown on confirm/submit step */}
      {!isConfirm && (
        <button type="button" className="btn-save-draft" onClick={handleSaveDraft}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
            <path d="M4 4h9l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" strokeLinejoin="round"/>
            <path d="M7 4v5h6V4M7 13h6" strokeLinecap="round"/>
          </svg>
          Simpan Draf
        </button>
      )}
      <FormActions
        onBack={stepIndex > 0 ? handleBack : undefined}
        onNext={handleNext}
        nextLabel={stepIndex === WIZARD_STEPS.length - 1 ? 'Hantar Permohonan' : 'Seterusnya'}
        showBack={stepIndex > 0}
      />
    </div>
  )

  return (
    <>
      <BirthFormLayout
        title={currentStep.title}
        subtitle={isTerms ? 'Sila baca dan fahami terma sebelum meneruskan.' : 'Sistem Pra Pendaftaran Kelahiran JPN'}
        step={stepNumber}
        totalSteps={TOTAL_STEPS}
        stepLabel={currentStep.label}
        onBack={handleBack}
        onCancel={onExit}
        footer={footer}
      >
        {error && <div className="form-error-banner" role="alert">{error}</div>}
        {renderStep()}
      </BirthFormLayout>

      <SaveToast visible={toastVisible} savedAt={savedAt} />
    </>
  )
}
