import { useState } from 'react'
import { VaccinationReminderCard } from './VaccinationReminderCard'
import { ImmunizationTimeline } from './ImmunizationTimeline'
import { ImmunizationVaccineList } from './ImmunizationVaccineList'
import {
  IMMUNIZATION_NOTES,
  OFFICIAL_SOURCE,
  PIK_STATS,
  PIK_SUMMARY,
  WHY_VACCINATE,
} from '../../data/immunizationSchedule'

type ImmunizationTab = 'ringkasan' | 'jadual' | 'vaksin' | 'info'

const TABS: { id: ImmunizationTab; label: string }[] = [
  { id: 'ringkasan', label: 'Ringkasan' },
  { id: 'jadual', label: 'Jadual' },
  { id: 'vaksin', label: 'Vaksin' },
  { id: 'info', label: 'Info' },
]

export function ImmunizationTabContent() {
  const [activeTab, setActiveTab] = useState<ImmunizationTab>('ringkasan')

  return (
    <>
      <nav className="immuno-tabs" aria-label="Tab imunisasi">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`immuno-tabs__item${activeTab === tab.id ? ' immuno-tabs__item--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="immuno-tab-panel">
        {activeTab === 'ringkasan' && <VaccinationReminderCard />}

        {activeTab === 'jadual' && (
          <section className="info-section">
            <h2 className="info-section__title">Jadual Imunisasi Bayi</h2>
            <p className="info-section__subtitle">Kelahiran hingga 18 bulan · Percuma di bawah PIK</p>
            <ImmunizationTimeline />
          </section>
        )}

        {activeTab === 'vaksin' && (
          <section className="info-section">
            <h2 className="info-section__title">Vaksin Utama</h2>
            <ImmunizationVaccineList />
          </section>
        )}

        {activeTab === 'info' && (
          <>
            <section className="info-section">
              <h2 className="info-section__title">Keterangan</h2>
              <div className="info-card info-card--hero">
                <div className="info-card__badge">{PIK_STATS}</div>
                <p className="info-card__lead">{PIK_SUMMARY}</p>
              </div>
            </section>

            <section className="info-section">
              <h2 className="info-section__title">Mengapa Perlu Vaksinasi</h2>
              <div className="benefit-list">
                {WHY_VACCINATE.map((item, i) => (
                  <article key={item.title} className="benefit-card">
                    <span className="benefit-card__num">{i + 1}</span>
                    <div>
                      <h3 className="benefit-card__title">{item.title}</h3>
                      <p className="benefit-card__text">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="info-section">
              <h2 className="info-section__title">Nota Penting</h2>
              <ul className="notes-list">
                {IMMUNIZATION_NOTES.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>

            <section className="info-section">
              <h2 className="info-section__title">Sumber Rasmi</h2>
              <div className="source-card">
                <a
                  href={OFFICIAL_SOURCE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-card__link"
                >
                  {OFFICIAL_SOURCE.title}
                </a>
                <p className="source-card__updated">Dikemaskini: {OFFICIAL_SOURCE.updated}</p>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  )
}
