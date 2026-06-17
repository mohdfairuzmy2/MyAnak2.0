import { PersonalizedHeader } from '../components/home/PersonalizedHeader'
import { NextActionCard } from '../components/home/NextActionCard'
import { ServiceGridModern } from '../components/home/ServiceGridModern'
import { FamilySummaryCard } from '../components/home/FamilySummaryCard'
import { BottomNav, type HomeTab } from '../components/BottomNav'
import { NotificationsPage } from './NotificationsPage'
import { ProfilePage } from './ProfilePage'

interface HomePageProps {
  activeTab: HomeTab
  onTabChange: (tab: HomeTab) => void
  onBirthRegistration: () => void
  onImmunization: () => void
  onBantuan: () => void
}

export function HomePage({
  activeTab,
  onTabChange,
  onBirthRegistration,
  onImmunization,
  onBantuan,
}: HomePageProps) {
  return (
    <>
      <div className="app__gradient-header">
        <PersonalizedHeader onNotifications={() => onTabChange('notifications')} />
        <svg
          className="app__wave"
          viewBox="0 0 390 32"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,16 C80,32 160,0 240,16 C310,28 360,8 390,16 L390,32 L0,32 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <main className="app__content">
        {activeTab === 'home' && (
          <>
            <NextActionCard onImmunization={onImmunization} />
            <ServiceGridModern
              onBirthRegistration={onBirthRegistration}
              onImmunization={onImmunization}
              onBantuan={onBantuan}
            />
            <FamilySummaryCard onViewAll={() => onTabChange('profile')} />
          </>
        )}
        {activeTab === 'notifications' && (
          <NotificationsPage onImmunization={onImmunization} />
        )}
        {activeTab === 'profile' && <ProfilePage onImmunization={onImmunization} />}
        {activeTab === 'menu' && (
          <div className="tab-page__header">
            <h1 className="tab-page__title">Menu</h1>
            <p className="tab-page__subtitle">Pilihan lain akan datang</p>
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </>
  )
}
