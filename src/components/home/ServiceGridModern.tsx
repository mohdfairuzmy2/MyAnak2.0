import type { ReactNode } from 'react'
import {
  PendaftaranAnakIcon,
  StatusMyKidIcon,
  BantuanIcon,
  ImunisasiIcon,
  PerancanganAnakIcon,
  MoreIcon,
} from '../ServiceIcons'
import { useImmunization } from '../../context/ImmunizationContext'
import { formatDaysUntil } from '../../utils/vaccinationReminder'

interface ServiceGridModernProps {
  onBirthRegistration: () => void
  onImmunization: () => void
  onBantuan: () => void
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

export function ServiceGridModern({
  onBirthRegistration,
  onImmunization,
  onBantuan,
}: ServiceGridModernProps) {
  const { birthDate, nextVaccination } = useImmunization()

  const imunSubtitle = birthDate && nextVaccination ? formatDaysUntil(nextVaccination.daysUntil) : 'Jadual PIK'

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
        />
        <ServiceCard
          accent="slate"
          icon={<MoreIcon />}
          label="Lagi"
        />
      </div>
    </section>
  )
}
