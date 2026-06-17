export type HomeTab = 'home' | 'notifications' | 'profile' | 'menu'

interface BottomNavProps {
  activeTab: HomeTab
  onTabChange: (tab: HomeTab) => void
}

const navItems: { id: HomeTab; label: string }[] = [
  { id: 'home', label: 'Utama' },
  { id: 'notifications', label: 'Notifikasi' },
  { id: 'profile', label: 'Profil' },
  { id: 'menu', label: 'Menu' },
]

function NavIcon({ id, active }: { id: HomeTab; active: boolean }) {
  const color = active ? '#0ea5a8' : '#94a3b8'
  const sw = active ? 2.2 : 1.8

  if (id === 'home') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 19V10.5z"
          stroke={color}
          strokeWidth={sw}
          fill={active ? color : 'none'}
        />
        <path
          d="M9.5 20.5V13h5v7.5"
          stroke={active ? 'white' : color}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (id === 'notifications') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.73 21a2 2 0 0 1-3.46 0"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (id === 'profile') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={sw} />
        <path
          d="M5 20c0-4 3-7 7-7s7 3 7 7"
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  )
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="bottom-nav-wrap">
      <nav className="bottom-nav bottom-nav--floating" aria-label="Navigasi utama">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              className={`bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
              onClick={() => onTabChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              type="button"
            >
              <span className="bottom-nav__icon">
                <NavIcon id={item.id} active={isActive} />
              </span>
              <span className="bottom-nav__label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
