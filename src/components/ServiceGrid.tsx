import type { ReactNode } from 'react'
import {
  PendaftaranAnakIcon,
  StatusMyKidIcon,
  BantuanIcon,
  ImunisasiIcon,
} from './ServiceIcons'

interface ServiceGridProps {
  onBirthRegistration: () => void
  onImmunization: () => void
}

interface ServiceCardProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

function ServiceCard({ icon, label, onClick }: ServiceCardProps) {
  return (
    <button className="service-card glass-card" onClick={onClick} type="button">
      <div className="service-card__icon glass-icon">{icon}</div>
      <span className="service-card__label">{label}</span>
    </button>
  )
}

const services = [
  {
    id: 'birth',
    label: 'Pendaftaran Kelahiran',
    icon: <PendaftaranAnakIcon />,
  },
  { id: 'mykid', label: 'Status MyKid', icon: <StatusMyKidIcon /> },
  { id: 'bantuan', label: 'Bantuan', icon: <BantuanIcon /> },
  { id: 'imunisasi', label: 'Imunisasi', icon: <ImunisasiIcon /> },
] as const

export function ServiceGrid({ onBirthRegistration, onImmunization }: ServiceGridProps) {
  const handlers: Record<string, (() => void) | undefined> = {
    birth: onBirthRegistration,
    imunisasi: onImmunization,
  }

  return (
    <section className="service-grid" aria-label="Perkhidmatan utama">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          icon={service.icon}
          label={service.label}
          onClick={handlers[service.id]}
        />
      ))}
    </section>
  )
}
