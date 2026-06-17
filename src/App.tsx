import { useState } from 'react'
import { UserProvider } from './context/UserContext'
import { ImmunizationProvider } from './context/ImmunizationContext'
import { HomePage } from './pages/HomePage'
import { BirthRegistrationFlow } from './pages/BirthRegistrationFlow'
import { ImmunizationPage } from './pages/ImmunizationPage'
import { BantuanPage } from './pages/BantuanPage'
import type { HomeTab } from './components/BottomNav'
import './App.css'
import './modern.css'
import './birth-registration.css'
import './info-pages.css'
import './profile.css'
import './bantuan.css'

type Page = 'home' | 'birth-registration' | 'immunization' | 'bantuan'

function AppShell() {
  const [page, setPage] = useState<Page>('home')
  const [homeTab, setHomeTab] = useState<HomeTab>('home')

  if (page === 'birth-registration') {
    return (
      <div className="app app--flow">
        <BirthRegistrationFlow onExit={() => setPage('home')} />
      </div>
    )
  }

  if (page === 'immunization') {
    return (
      <div className="app app--flow">
        <ImmunizationPage
          onBack={() => setPage('home')}
          onGoProfile={() => { setPage('home'); setHomeTab('profile') }}
        />
      </div>
    )
  }

  if (page === 'bantuan') {
    return (
      <div className="app app--flow">
        <BantuanPage onBack={() => setPage('home')} />
      </div>
    )
  }

  return (
    <div className="app">
      <HomePage
        activeTab={homeTab}
        onTabChange={setHomeTab}
        onBirthRegistration={() => setPage('birth-registration')}
        onImmunization={() => setPage('immunization')}
        onBantuan={() => setPage('bantuan')}
      />
    </div>
  )
}

function App() {
  return (
    <UserProvider>
      <ImmunizationProvider>
        <AppShell />
      </ImmunizationProvider>
    </UserProvider>
  )
}

export default App
