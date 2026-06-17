import type { CSSProperties } from 'react'

const LPPKN_ARTICLE_URL =
  'https://www.lppkn.gov.my/lppkngateway/frontend/web/index.php?r=portal/article-full&menu=81&id=U1kvczF0L09aY3Q1bkNDWld3cUsvUT09'
const LPPKN_CLINIC_MAP_URL =
  'https://www.lppkn.gov.my/lppkngateway/frontend/web/index.php?r=portal/map2&menu=63&id=bFJWeWR0bXErVUhhVVNaWExrVTUrQT09'

interface Method {
  nama: string
  perihal: string
  caj: string
}

const KAEDAH: Method[] = [
  { nama: 'Pil Kontraseptif', perihal: 'Pil hormon harian, pelbagai dos mengikut keperluan.', caj: 'Dari RM5/bln' },
  { nama: 'Suntikan Kontraseptif', perihal: 'Suntikan hormon setiap 1–3 bulan.', caj: 'Dari RM18' },
  { nama: 'Implan', perihal: 'Rod kecil di bawah kulit lengan. Tempoh sehingga 3 tahun.', caj: 'RM500' },
  { nama: 'Alat Dalam Rahim (IUCD/ADR)', perihal: 'Dipasang dalam rahim oleh pegawai. Tempoh 3 tahun.', caj: 'RM80' },
  { nama: 'Kondom', perihal: 'Kaedah penghalang, mudah digunakan.', caj: 'RM1 (3 pcs)' },
  { nama: 'Vasektomi', perihal: 'Pembedahan kecil untuk lelaki (kaedah kekal).', caj: 'Dari RM300' },
]

const SARINGAN: Method[] = [
  { nama: 'Pendaftaran & Perundingan', perihal: 'Sesi nasihat dengan pegawai kesihatan.', caj: 'RM5' },
  { nama: 'Pap Smear', perihal: 'Saringan kanser serviks untuk wanita.', caj: 'RM20' },
  { nama: 'Ujian Kehamilan (UPT)', perihal: 'Ujian air kencing untuk sahkan kehamilan.', caj: 'RM10' },
  { nama: 'Vaksin HPV', perihal: 'Perlindungan terhadap virus HPV.', caj: 'RM180/dos' },
]

const feeBadgeStyle: CSSProperties = {
  flexShrink: 0,
  fontSize: '0.6875rem',
  fontWeight: 700,
  color: 'var(--color-accent)',
  background: '#eef2ff',
  padding: '4px 10px',
  borderRadius: 99,
  whiteSpace: 'nowrap',
}

function MethodCard({ m }: { m: Method }) {
  return (
    <article className="benefit-card">
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h3 className="benefit-card__title" style={{ margin: 0 }}>{m.nama}</h3>
          <span style={feeBadgeStyle}>{m.caj}</span>
        </div>
        <p className="benefit-card__text">{m.perihal}</p>
      </div>
    </article>
  )
}

interface PerancanganPageProps {
  onBack: () => void
}

export function PerancanganPage({ onBack }: PerancanganPageProps) {
  return (
    <div className="info-page info-page--modern">
      <header className="info-page__header">
        <button type="button" className="info-page__back" onClick={onBack} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="info-page__header-text">
          <p className="info-page__eyebrow">LPPKN · Klinik Nur Sejahtera</p>
          <h1 className="info-page__title">Perancangan Keluarga</h1>
        </div>
      </header>

      <main className="info-page__content" style={{ paddingTop: 16 }}>
        <section className="info-section">
          <div className="info-card info-card--hero">
            <span className="info-card__badge">LPPKN</span>
            <p className="info-card__lead">
              LPPKN menyediakan khidmat nasihat dan kaedah perancang keluarga moden
              melalui Klinik Nur Sejahtera (KNS) — kira-kira 49 klinik di seluruh
              Malaysia. Rancang jarak kehamilan untuk kesejahteraan keluarga.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Kaedah Perancang Keluarga</h2>
          <p className="info-section__subtitle">Caj anggaran bagi warganegara &amp; penduduk tetap</p>
          <div className="benefit-list">
            {KAEDAH.map((m) => (
              <MethodCard key={m.nama} m={m} />
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Saringan &amp; Perkhidmatan Lain</h2>
          <div className="benefit-list">
            {SARINGAN.map((m) => (
              <MethodCard key={m.nama} m={m} />
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Nota Penting</h2>
          <ul className="notes-list">
            <li>Caj di atas untuk warganegara &amp; penduduk tetap; caj warga asing mungkin berbeza.</li>
            <li>Sesi perundingan membantu anda memilih kaedah yang sesuai mengikut kesihatan dan keperluan keluarga.</li>
            <li>Senarai penuh kaedah, caj terkini dan lokasi klinik boleh dirujuk di portal rasmi LPPKN.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2 className="info-section__title">Maklumat Lanjut</h2>
          <div className="source-card">
            <a href={LPPKN_ARTICLE_URL} target="_blank" rel="noopener noreferrer" className="source-card__link">
              Perancang Keluarga — Portal Rasmi LPPKN
            </a>
            <a href={LPPKN_CLINIC_MAP_URL} target="_blank" rel="noopener noreferrer" className="source-card__link">
              Cari Klinik Nur Sejahtera berdekatan
            </a>
            <p className="source-card__updated">Sumber: lppkn.gov.my</p>
          </div>
        </section>
      </main>
    </div>
  )
}
