export function HeroVisual() {
  return (
    <svg
      className="hero__visual"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="120" cy="70" r="52" fill="url(#heroGlow)" opacity="0.9" />
      <circle cx="120" cy="70" r="36" stroke="#1a5a8a" strokeWidth="1.5" opacity="0.2" />
      <circle cx="120" cy="70" r="24" stroke="#1a5a8a" strokeWidth="1.5" opacity="0.15" />

      <rect x="88" y="88" width="18" height="28" rx="4" fill="#1a5a8a" opacity="0.85" />
      <circle cx="97" cy="80" r="7" fill="#1a5a8a" opacity="0.85" />

      <rect x="112" y="90" width="16" height="26" rx="4" fill="#c0392b" opacity="0.8" />
      <circle cx="120" cy="82" r="6.5" fill="#c0392b" opacity="0.8" />

      <circle cx="105" cy="98" r="5" fill="#ffffff" stroke="#1a5a8a" strokeWidth="1.5" />

      <path
        d="M28 110h104"
        stroke="#1a5a8a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.15"
      />
      <rect x="40" y="96" width="8" height="14" rx="1" fill="#1a5a8a" opacity="0.12" />
      <rect x="52" y="88" width="10" height="22" rx="1" fill="#1a5a8a" opacity="0.18" />
      <rect x="66" y="92" width="7" height="18" rx="1" fill="#1a5a8a" opacity="0.12" />

      <defs>
        <radialGradient id="heroGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#eff6ff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
