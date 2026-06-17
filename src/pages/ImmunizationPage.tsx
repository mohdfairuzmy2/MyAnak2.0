import { useImmunization } from '../context/ImmunizationContext'
import { useUser } from '../context/UserContext'
import { ImmunizationTabContent } from '../components/immunization/ImmunizationTabContent'

interface ImmunizationPageProps {
  onBack: () => void
  onGoProfile?: () => void
}

export function ImmunizationPage({ onBack, onGoProfile }: ImmunizationPageProps) {
  const { family } = useUser()
  const { activeChild, selectChild } = useImmunization()

  const hasChildren = family.senaraAnak.length > 0

  return (
    <div className="info-page info-page--modern">
      <header className="info-page__header">
        <button type="button" className="info-page__back" onClick={onBack} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="info-page__header-text">
          <p className="info-page__eyebrow">KKM · Program Imunisasi Kebangsaan</p>
          <h1 className="info-page__title">Imunisasi Bayi & Kanak-kanak</h1>
        </div>
      </header>

      <main className="info-page__content info-page__content--tabs">

        {/* Child selector */}
        {hasChildren ? (
          <div className="immun-child-selector">
            <p className="immun-child-selector__label">Pilih anak:</p>
            <div className="immun-child-selector__list">
              {family.senaraAnak.map((anak) => (
                <button
                  key={anak.id}
                  type="button"
                  className={`immun-child-chip ${activeChild?.id === anak.id ? 'immun-child-chip--active' : ''}`}
                  onClick={() => selectChild(anak.id)}
                >
                  <span className="immun-child-chip__emoji">
                    {anak.jantina === 'lelaki' ? '👦' : '👧'}
                  </span>
                  <span className="immun-child-chip__name">
                    {anak.nama.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="immun-no-child">
            <div className="immun-no-child__icon">👶</div>
            <p className="immun-no-child__title">Tiada rekod anak</p>
            <p className="immun-no-child__desc">
              Sila tambah maklumat anak dalam profil dahulu sebelum mengurus imunisasi.
            </p>
            {onGoProfile && (
              <button type="button" className="btn btn--primary immun-no-child__btn" onClick={onGoProfile}>
                Pergi ke Profil
              </button>
            )}
          </div>
        )}

        {hasChildren && <ImmunizationTabContent />}
      </main>
    </div>
  )
}
