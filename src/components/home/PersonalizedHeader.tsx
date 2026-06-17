import { useImmunization } from '../../context/ImmunizationContext'
import { hasUpcomingReminder } from '../../utils/vaccinationReminder'

interface PersonalizedHeaderProps {
  onNotifications?: () => void
}

function FamilyIllustration() {
  return (
    <svg
      className="welcome-hero__family"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="blobFatherGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#5eead4"/>
          <stop offset="100%" stopColor="#0891b2"/>
        </radialGradient>
        <radialGradient id="blobMotherGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fda4d4"/>
          <stop offset="100%" stopColor="#db2777"/>
        </radialGradient>
        <radialGradient id="blobChildGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#fed7aa"/>
          <stop offset="100%" stopColor="#ea6800"/>
        </radialGradient>
        <radialGradient id="headGrad" cx="35%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#fef3c7"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </radialGradient>
        <filter id="blobShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>

      {/* Background — transparent to show navy */}
      <rect width="200" height="200" fill="transparent"/>

      {/* Decorative background circles */}
      <circle cx="168" cy="22" r="30" fill="rgba(255,255,255,0.04)"/>
      <circle cx="168" cy="22" r="18" fill="rgba(255,255,255,0.05)"/>
      <circle cx="14" cy="148" r="22" fill="rgba(14,165,168,0.08)"/>

      {/* Sparkle stars */}
      <path d="M18 32 L19.8 27 L21.6 32 L26.5 33.5 L21.6 35 L19.8 40 L18 35 L13 33.5Z" fill="#fbbf24" fillOpacity="0.75"/>
      <path d="M174 56 L175.4 52 L176.8 56 L180.5 57.2 L176.8 58.4 L175.4 62 L174 58.4 L170.2 57.2Z" fill="#fda4d4" fillOpacity="0.65"/>
      <circle cx="12" cy="72" r="3" fill="#5eead4" fillOpacity="0.5"/>
      <circle cx="186" cy="36" r="2" fill="#fed7aa" fillOpacity="0.7"/>
      <circle cx="180" cy="80" r="1.5" fill="#5eead4" fillOpacity="0.4"/>
      <circle cx="30" cy="155" r="2" fill="#fda4d4" fillOpacity="0.35"/>

      {/* Ground glow */}
      <ellipse cx="100" cy="188" rx="80" ry="10" fill="rgba(14,165,168,0.15)"/>

      {/* ── FATHER (left) — teal blob ── */}
      {/* Shadow */}
      <ellipse cx="52" cy="183" rx="22" ry="6" fill="rgba(8,145,178,0.3)"/>
      {/* Body blob */}
      <ellipse cx="52" cy="140" rx="22" ry="30" fill="url(#blobFatherGrad)" filter="url(#blobShadow)"/>
      {/* Body shine */}
      <ellipse cx="44" cy="122" rx="8" ry="12" fill="white" fillOpacity="0.12"/>
      {/* Tiny feet */}
      <ellipse cx="44" cy="170" rx="9" ry="6" fill="#0369a1"/>
      <ellipse cx="60" cy="170" rx="9" ry="6" fill="#0369a1"/>
      {/* Head */}
      <circle cx="52" cy="100" r="20" fill="url(#headGrad)" filter="url(#blobShadow)"/>
      {/* Head shine */}
      <ellipse cx="45" cy="93" rx="7" ry="5" fill="white" fillOpacity="0.22"/>
      {/* Hair */}
      <path d="M33 96 Q52 80 71 96 Q68 82 52 79 Q36 82 33 96Z" fill="#1c0e00"/>
      {/* Eyes */}
      <circle cx="44" cy="99" r="3.5" fill="#111"/>
      <circle cx="45.4" cy="97.8" r="1.2" fill="white" fillOpacity="0.7"/>
      <circle cx="60" cy="99" r="3.5" fill="#111"/>
      <circle cx="61.4" cy="97.8" r="1.2" fill="white" fillOpacity="0.7"/>
      {/* Blush */}
      <ellipse cx="40" cy="105" rx="4" ry="2.5" fill="#fb923c" fillOpacity="0.3"/>
      <ellipse cx="64" cy="105" rx="4" ry="2.5" fill="#fb923c" fillOpacity="0.3"/>
      {/* Smile */}
      <path d="M44 107 Q52 114 60 107" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Arm stubs */}
      <ellipse cx="27" cy="138" rx="7" ry="10" fill="#2dd4bf" transform="rotate(-15 27 138)"/>
      <ellipse cx="77" cy="138" rx="7" ry="10" fill="#0891b2" transform="rotate(15 77 138)"/>

      {/* ── CHILD (centre) — orange blob ── */}
      {/* Shadow */}
      <ellipse cx="100" cy="183" rx="18" ry="5" fill="rgba(234,104,0,0.28)"/>
      {/* Body blob */}
      <ellipse cx="100" cy="148" rx="17" ry="23" fill="url(#blobChildGrad)" filter="url(#blobShadow)"/>
      <ellipse cx="93" cy="132" rx="6" ry="9" fill="white" fillOpacity="0.12"/>
      {/* Tiny feet */}
      <ellipse cx="93" cy="170" rx="7.5" ry="5" fill="#c2410c"/>
      <ellipse cx="107" cy="170" rx="7.5" ry="5" fill="#c2410c"/>
      {/* Head */}
      <circle cx="100" cy="114" r="17" fill="url(#headGrad)" filter="url(#blobShadow)"/>
      <ellipse cx="93" cy="107" rx="6" ry="4" fill="white" fillOpacity="0.22"/>
      {/* Hair */}
      <path d="M84 110 Q100 97 116 110 Q113 98 100 96 Q87 98 84 110Z" fill="#1c0e00"/>
      {/* Eyes */}
      <circle cx="93" cy="113" r="3" fill="#111"/>
      <circle cx="94.2" cy="111.8" r="1" fill="white" fillOpacity="0.7"/>
      <circle cx="107" cy="113" r="3" fill="#111"/>
      <circle cx="108.2" cy="111.8" r="1" fill="white" fillOpacity="0.7"/>
      {/* Blush */}
      <ellipse cx="88" cy="118" rx="3.5" ry="2" fill="#fb923c" fillOpacity="0.35"/>
      <ellipse cx="112" cy="118" rx="3.5" ry="2" fill="#fb923c" fillOpacity="0.35"/>
      {/* Smile */}
      <path d="M93 120 Q100 127 107 120" stroke="#7c2d12" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      {/* Arm stubs */}
      <ellipse cx="80" cy="148" rx="6" ry="8" fill="#fed7aa" transform="rotate(-15 80 148)"/>
      <ellipse cx="120" cy="148" rx="6" ry="8" fill="#ea6800" transform="rotate(15 120 148)"/>
      {/* Floating heart on chest */}
      <path d="M100 138 Q97.5 134 95 134 Q92 134 92 137 Q92 140 100 145 Q108 140 108 137 Q108 134 105 134 Q102.5 134 100 138Z" fill="#fb7185"/>
      <path d="M95.5 135.5 Q97.5 134.5 99 136.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>

      {/* ── MOTHER (right) — pink blob ── */}
      {/* Shadow */}
      <ellipse cx="148" cy="183" rx="22" ry="6" fill="rgba(219,39,119,0.25)"/>
      {/* Dress flare */}
      <ellipse cx="148" cy="158" rx="24" ry="18" fill="#db2777" fillOpacity="0.7"/>
      {/* Body blob */}
      <ellipse cx="148" cy="140" rx="21" ry="28" fill="url(#blobMotherGrad)" filter="url(#blobShadow)"/>
      <ellipse cx="140" cy="122" rx="8" ry="11" fill="white" fillOpacity="0.12"/>
      {/* Tiny feet */}
      <ellipse cx="140" cy="170" rx="8.5" ry="5.5" fill="#9d174d"/>
      <ellipse cx="156" cy="170" rx="8.5" ry="5.5" fill="#9d174d"/>
      {/* Head */}
      <circle cx="148" cy="100" r="20" fill="url(#headGrad)" filter="url(#blobShadow)"/>
      <ellipse cx="141" cy="93" rx="7" ry="5" fill="white" fillOpacity="0.22"/>
      {/* Hair — long */}
      <path d="M129 96 Q148 80 167 96 Q164 82 148 79 Q132 82 129 96Z" fill="#1c0e00"/>
      <path d="M129 96 Q123 120 126 148" stroke="#1c0e00" strokeWidth="8" strokeLinecap="round"/>
      <path d="M167 96 Q173 120 170 148" stroke="#1c0e00" strokeWidth="8" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="140" cy="99" r="3.5" fill="#111"/>
      <circle cx="141.4" cy="97.8" r="1.2" fill="white" fillOpacity="0.7"/>
      <circle cx="156" cy="99" r="3.5" fill="#111"/>
      <circle cx="157.4" cy="97.8" r="1.2" fill="white" fillOpacity="0.7"/>
      {/* Blush */}
      <ellipse cx="136" cy="105" rx="4" ry="2.5" fill="#fb923c" fillOpacity="0.3"/>
      <ellipse cx="160" cy="105" rx="4" ry="2.5" fill="#fb923c" fillOpacity="0.3"/>
      {/* Smile */}
      <path d="M140 107 Q148 114 156 107" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Arm stubs */}
      <ellipse cx="124" cy="138" rx="7" ry="10" fill="#fda4d4" transform="rotate(-15 124 138)"/>
      <ellipse cx="172" cy="138" rx="7" ry="10" fill="#db2777" transform="rotate(15 172 138)"/>
    </svg>
  )
}

export function PersonalizedHeader({ onNotifications }: PersonalizedHeaderProps) {
  const { birthDate, nextVaccination } = useImmunization()
  const notificationCount = Number(!birthDate) + Number(hasUpcomingReminder(nextVaccination))

  return (
    <header className="welcome-hero">
      <div className="welcome-hero__top">
        <div className="welcome-hero__brand" aria-label="MyAnak">
          <span className="welcome-hero__brand-my">My</span>
          <span className="welcome-hero__brand-anak">Anak</span>
        </div>
        <button
          className="welcome-hero__notification"
          aria-label="Notifikasi"
          type="button"
          onClick={onNotifications}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
          </svg>
          {notificationCount > 0 && (
            <span className="welcome-hero__badge-count" aria-label={`${notificationCount} notifikasi`}>
              {notificationCount}
            </span>
          )}
        </button>
      </div>

      <div className="welcome-hero__body">
        <div className="welcome-hero__content">
          <p className="welcome-hero__eyebrow">Selamat datang,</p>
          <h1 className="welcome-hero__title">Keluarga Bahagia <span aria-hidden="true">👋</span></h1>
          <p className="welcome-hero__subtitle">
            Urus urusan keluarga anda dengan mudah dalam satu aplikasi.
          </p>
        </div>

        <div className="welcome-hero__art" aria-hidden="true">
          <FamilyIllustration />
        </div>
      </div>
    </header>
  )
}
