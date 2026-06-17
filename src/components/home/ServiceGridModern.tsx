import { useState, type ReactNode } from 'react'
import {
  PendaftaranAnakIcon,
  StatusMyKidIcon,
  BantuanIcon,
  ImunisasiIcon,
  PerancanganAnakIcon,
  MoreIcon,
} from '../ServiceIcons'
import { useImmunization } from '../../context/ImmunizationContext'
import { useUser } from '../../context/UserContext'
import { formatDaysUntil } from '../../utils/vaccinationReminder'

const MYKID_STATUS_URL = 'https://spcmykid.jpn.gov.my/semak_mykid/'

interface ServiceGridModernProps {
  onBirthRegistration: () => void
  onImmunization: () => void
  onBantuan: () => void
  onPerancangan: () => void
}

interface ServiceCardProps {
  icon: ReactNode
  label: string
  subtitle?: string
  accent?: 'mint' | 'blue' | 'peach' | 'teal' | 'violet' | 'slate'
  onClick?: () => void
}

function ServiceCard({
  icon,
  label,
  subtitle,
  accent = 'mint',
  onClick,
}: ServiceCardProps) {
  const className = `service-card-v2 service-card-v2--${accent}${onClick ? '' : ' service-card-v2--static'}`

  if (!onClick) {
    return (
      <div className={className} aria-disabled="true">
        <div className="service-card-v2__icon">{icon}</div>
        <div className="service-card-v2__text">
          <span className="service-card-v2__label">{label}</span>
          {subtitle && <span className="service-card-v2__subtitle">{subtitle}</span>}
        </div>
      </div>
    )
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      <div className="service-card-v2__icon">{icon}</div>
      <div className="service-card-v2__text">
        <span className="service-card-v2__label">{label}</span>
        {subtitle && <span className="service-card-v2__subtitle">{subtitle}</span>}
      </div>
    </button>
  )
}

function MyKidCheckSheet({
  defaultNumber,
  onClose,
}: {
  defaultNumber: string
  onClose: () => void
}) {
  const [num, setNum] = useState(defaultNumber)
  const cleaned = num.replace(/\D/g, '')

  async function handleSubmit() {
    if (cleaned) {
      try {
        await navigator.clipboard.writeText(cleaned)
      } catch {
        /* clipboard unavailable — continue to portal */
      }
    }
    window.open(MYKID_STATUS_URL, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <div className="prof-sheet-overlay" onClick={onClose}>
      <div className="prof-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="prof-sheet__header">
          <span className="prof-sheet__title">Semak Status MyKid</span>
          <button type="button" className="prof-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="prof-sheet__body">
          <p className="prof-empty">
            Masukkan nombor MyKid anak, kemudian semak status permohonan di portal rasmi JPN.
          </p>
          <label className="prof-field">
            <span>Nombor MyKid</span>
            <input
              className="form-input"
              inputMode="numeric"
              placeholder="Contoh: 240101140123"
              maxLength={14}
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
          </label>
          <p className="prof-empty">
            Anda akan dibawa ke laman rasmi JPN (spcmykid.jpn.gov.my)
            {cleaned ? '. Nombor akan disalin automatik untuk memudahkan tampal.' : '.'}
          </p>
        </div>

        <div className="prof-sheet__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose}>
            Batal
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSubmit}>
            Semak di Portal JPN
          </button>
        </div>
      </div>
    </div>
  )
}

export function ServiceGridModern({
  onBirthRegistration,
  onImmunization,
  onBantuan,
  onPerancangan,
}: ServiceGridModernProps) {
  const { birthDate, nextVaccination } = useImmunization()
  const { family } = useUser()
  const [showMyKid, setShowMyKid] = useState(false)

  const imunSubtitle = birthDate && nextVaccination ? formatDaysUntil(nextVaccination.daysUntil) : 'Jadual PIK'
  const defaultMyKid = family.senaraAnak[0]?.noKad ?? ''

  return (
    <section className="home-section" aria-label="Perkhidmatan utama">
      <div className="home-section__head">
        <h2 className="home-section__title">Perkhidmatan Utama</h2>
      </div>

      <div className="service-grid-v2">
        <ServiceCard
          accent="mint"
          icon={<PendaftaranAnakIcon />}
          label="Pendaftaran Kelahiran"
          onClick={onBirthRegistration}
        />
        <ServiceCard
          accent="blue"
          icon={<StatusMyKidIcon />}
          label="Status MyKid"
          subtitle="Semak di JPN"
          onClick={() => setShowMyKid(true)}
        />
        <ServiceCard
          accent="peach"
          icon={<BantuanIcon />}
          label="Bantuan"
          onClick={onBantuan}
        />
        <ServiceCard
          accent="teal"
          icon={<ImunisasiIcon />}
          label="Imunisasi"
          subtitle={imunSubtitle}
          onClick={onImmunization}
        />
        <ServiceCard
          accent="violet"
          icon={<PerancanganAnakIcon />}
          label="Perancangan Anak"
          subtitle="LPPKN"
          onClick={onPerancangan}
        />
        <ServiceCard
          accent="slate"
          icon={<MoreIcon />}
          label="Lagi"
        />
      </div>

      {showMyKid && (
        <MyKidCheckSheet defaultNumber={defaultMyKid} onClose={() => setShowMyKid(false)} />
      )}
    </section>
  )
}
