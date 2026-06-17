import { useState } from 'react'
import { VACCINES } from '../../data/immunizationSchedule'

export function ImmunizationVaccineList() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="vaccine-accordion">
      {VACCINES.map((v) => {
        const isOpen = expanded === v.code
        return (
          <article key={v.code} className={`vaccine-accordion__item${isOpen ? ' vaccine-accordion__item--open' : ''}`}>
            <button
              type="button"
              className="vaccine-accordion__trigger"
              onClick={() => setExpanded(isOpen ? null : v.code)}
              aria-expanded={isOpen}
            >
              <span className="vaccine-accordion__code">{v.code}</span>
              <span className="vaccine-accordion__name">{v.name}</span>
              <svg className="vaccine-accordion__chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {isOpen && (
              <div className="vaccine-accordion__body">
                <p>{v.prevents}</p>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
