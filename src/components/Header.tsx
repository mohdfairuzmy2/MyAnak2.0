import { Logo } from './Logo'

export function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <Logo />
        <div className="header__text">
          <span className="header__badge">Portal Digital Kerajaan</span>
          <h1 className="header__title">MyAnak</h1>
          <p className="header__tagline">Urusan awal, lebih mudah bersama kerajaan</p>
        </div>
      </div>
      <button className="header__notification" aria-label="Notifikasi">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path
            d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
        </svg>
      </button>
    </header>
  )
}
