/* 3D-style SVG icons — light source from top-left */

export function PendaftaranAnakIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pk-doc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <filter id="pk-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#00000033"/>
        </filter>
      </defs>
      {/* Document body */}
      <rect x="10" y="6" width="28" height="36" rx="5" fill="white" fillOpacity="0.9" filter="url(#pk-shadow)"/>
      <rect x="10" y="6" width="28" height="36" rx="5" fill="url(#pk-doc)"/>
      {/* Dog-ear fold */}
      <path d="M30 6 L38 14 L30 14 Z" fill="white" fillOpacity="0.5"/>
      {/* Baby face */}
      <circle cx="24" cy="22" r="7" fill="white" fillOpacity="0.95"/>
      <circle cx="21.5" cy="21" r="1.2" fill="#059669"/>
      <circle cx="26.5" cy="21" r="1.2" fill="#059669"/>
      <path d="M21 25 Q24 27.5 27 25" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Lines */}
      <rect x="14" y="32" width="14" height="2" rx="1" fill="white" fillOpacity="0.6"/>
      <rect x="14" y="36" width="10" height="2" rx="1" fill="white" fillOpacity="0.4"/>
      {/* Heart badge */}
      <circle cx="38" cy="38" r="7" fill="#f43f5e"/>
      <path d="M38 41.5 Q34 38 34 36 Q34 33.5 36.5 33.5 Q37.5 33.5 38 34.5 Q38.5 33.5 39.5 33.5 Q42 33.5 42 36 Q42 38 38 41.5Z" fill="white" fillOpacity="0.9"/>
    </svg>
  )
}

export function StatusMyKidIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="mk-shine" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
        <filter id="mk-shadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1d4ed833"/>
        </filter>
      </defs>
      {/* Card body */}
      <rect x="6" y="14" width="40" height="26" rx="6" fill="white" fillOpacity="0.88" filter="url(#mk-shadow)"/>
      <rect x="6" y="14" width="40" height="12" rx="6" fill="white" fillOpacity="0.4"/>
      <rect x="6" y="20" width="40" height="6" fill="white" fillOpacity="0.4"/>
      {/* Shine */}
      <rect x="6" y="14" width="40" height="26" rx="6" fill="url(#mk-shine)"/>
      {/* Photo box */}
      <rect x="11" y="21" width="13" height="13" rx="3" fill="white" fillOpacity="0.35"/>
      <circle cx="17.5" cy="25" r="3.5" fill="white" fillOpacity="0.8"/>
      <path d="M12 34 Q17.5 30 23 34" fill="white" fillOpacity="0.8"/>
      {/* Lines */}
      <rect x="27" y="22" width="15" height="2.5" rx="1.2" fill="white" fillOpacity="0.8"/>
      <rect x="27" y="27" width="11" height="2" rx="1" fill="white" fillOpacity="0.6"/>
      <rect x="27" y="31" width="8" height="2" rx="1" fill="white" fillOpacity="0.4"/>
      {/* MY text bottom-left */}
      <rect x="8" y="36" width="20" height="1.5" rx="0.75" fill="white" fillOpacity="0.5"/>
    </svg>
  )
}

export function BantuanIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="bt-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#dc262633"/>
        </filter>
      </defs>
      {/* Left hand */}
      <path d="M8 36 Q10 28 16 27 L20 27 Q22 27 22 29 L22 38 Q16 40 10 38 Z"
        fill="white" fillOpacity="0.8" filter="url(#bt-shadow)"/>
      {/* Right hand */}
      <path d="M34 27 L38 27 Q44 28 46 36 L44 38 Q38 40 34 38 L34 29 Q34 27 34 27Z"
        fill="white" fillOpacity="0.7"/>
      {/* Joining fingers */}
      <path d="M22 32 Q28 34 34 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Heart floating */}
      <path d="M28 22.5 Q25.5 18 23 18 Q19.5 18 19.5 21.5 Q19.5 25 28 30 Q36.5 25 36.5 21.5 Q36.5 18 33 18 Q30.5 18 28 22.5Z"
        fill="white" fillOpacity="0.95" filter="url(#bt-shadow)"/>
      {/* Heart highlight */}
      <path d="M22 19 Q24 18 25.5 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fillOpacity="0.6" fill="none"/>
    </svg>
  )
}

export function ImunisasiIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="im-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6"/>
        </linearGradient>
        <filter id="im-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0d948833"/>
        </filter>
      </defs>
      {/* Syringe barrel */}
      <rect x="14" y="22" width="26" height="12" rx="4" fill="url(#im-body)" filter="url(#im-shadow)"/>
      {/* Liquid inside */}
      <rect x="16" y="24.5" width="14" height="7" rx="2" fill="white" fillOpacity="0.5"/>
      {/* Plunger */}
      <rect x="39" y="24" width="5" height="8" rx="2" fill="white" fillOpacity="0.7"/>
      <rect x="43" y="26" width="2" height="4" rx="1" fill="white" fillOpacity="0.4"/>
      {/* Needle */}
      <path d="M14 28 L6 28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      <path d="M9 28 L6 26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Measurement lines */}
      <line x1="27" y1="22" x2="27" y2="34" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      <line x1="32" y1="22" x2="32" y2="34" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>
      {/* Shield */}
      <path d="M46 30 L42 32 L38 30 L38 26 Q42 24.5 46 26 Z"
        fill="white" fillOpacity="0.9" filter="url(#im-shadow)"/>
      <path d="M39.8 28.8 l1.5 1.5 3-3" stroke="#0d9488" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PerancanganAnakIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="pa-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#7c3aed33"/>
        </filter>
      </defs>
      {/* Heart top */}
      <path d="M28 16 Q25 11 22 11 Q17.5 11 17.5 15.5 Q17.5 20 28 26 Q38.5 20 38.5 15.5 Q38.5 11 34 11 Q31 11 28 16Z"
        fill="white" fillOpacity="0.95" filter="url(#pa-shadow)"/>
      {/* Highlight on heart */}
      <path d="M21 12.5 Q23.5 11.5 25 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
      {/* Father silhouette */}
      <circle cx="16" cy="35" r="5" fill="white" fillOpacity="0.85"/>
      <path d="M9 48 Q11 41 16 41 Q21 41 23 48" fill="white" fillOpacity="0.8"/>
      {/* Mother silhouette */}
      <circle cx="40" cy="35" r="5" fill="white" fillOpacity="0.75"/>
      <path d="M33 48 Q35 41 40 41 Q45 41 47 48" fill="white" fillOpacity="0.7"/>
      {/* Child silhouette — centre */}
      <circle cx="28" cy="38" r="3.5" fill="white" fillOpacity="0.9"/>
      <path d="M23.5 48 Q25 43 28 43 Q31 43 32.5 48" fill="white" fillOpacity="0.85"/>
    </svg>
  )
}

export function MoreIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="mo-shadow">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#64748b33"/>
        </filter>
      </defs>
      {/* 2x2 grid of 3D dots */}
      <rect x="13" y="13" width="13" height="13" rx="4" fill="white" fillOpacity="0.85" filter="url(#mo-shadow)"/>
      <rect x="30" y="13" width="13" height="13" rx="4" fill="white" fillOpacity="0.75" filter="url(#mo-shadow)"/>
      <rect x="13" y="30" width="13" height="13" rx="4" fill="white" fillOpacity="0.65" filter="url(#mo-shadow)"/>
      <rect x="30" y="30" width="13" height="13" rx="4" fill="white" fillOpacity="0.55" filter="url(#mo-shadow)"/>
      {/* Shine dots on each block */}
      <circle cx="17" cy="17" r="2" fill="white" fillOpacity="0.5"/>
      <circle cx="34" cy="17" r="2" fill="white" fillOpacity="0.4"/>
      <circle cx="17" cy="34" r="2" fill="white" fillOpacity="0.35"/>
      <circle cx="34" cy="34" r="2" fill="white" fillOpacity="0.3"/>
    </svg>
  )
}
