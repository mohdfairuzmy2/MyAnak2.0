import { HeroVisual } from './HeroVisual'

export function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__accent" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Perkhidmatan Digital</span>
          <h2 className="hero__title">Selamat datang!</h2>
          <p className="hero__subtitle">
            Urusan awal kelahiran anak dalam satu pengalaman digital.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}
