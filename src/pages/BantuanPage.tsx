import { useMemo, useState } from 'react'
import { useUser } from '../context/UserContext'

/* ── Types ── */
type Status = 'layak' | 'semak' | 'tidak'

interface BantuanItem {
  id: string
  nama: string
  agensi: string
  agensiPendek: string
  warna: 'hijau' | 'biru' | 'oren' | 'ungu'
  iconPath: string
  portalUrl: string
  perihal: string
  status: Status
  jumlah?: string
  sebab?: string
  butirButir: { label: string; nilai: string; highlight?: boolean }[]
}

/* ── Icon ── */
function BantuanSvgIcon({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d={path} />
    </svg>
  )
}

const ICONS = {
  cash:    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H9l3-6 3 6h-2v4z',
  heart:   'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z',
  school:  'M22 10v6M2 10l10-5 10 5-10 5-10-5zm7 5v4a2 2 0 004 0v-4',
  home:    'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
  baby:    'M9 12h6m-3-3v6M17 21H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z',
  card:    'M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2zm-9 9H6m3 3H6',
}

const WARNA_BG: Record<string, string> = {
  hijau: '#dcfce7', biru: '#dbeafe', oren: '#ffedd5', ungu: '#ede9fe',
}
const WARNA_TEXT: Record<string, string> = {
  hijau: '#166534', biru: '#1e40af', oren: '#9a3412', ungu: '#4c1d95',
}
const STATUS_LABEL: Record<Status, string> = {
  layak: 'Layak', semak: 'Perlu semak', tidak: 'Tidak layak',
}
const STATUS_COLOR: Record<Status, { bg: string; text: string }> = {
  layak: { bg: '#dcfce7', text: '#166534' },
  semak: { bg: '#fef9c3', text: '#854d0e' },
  tidak: { bg: '#f1f5f9', text: '#64748b' },
}

/* ── Compute matched programs ── */
function useBantuanList(): BantuanItem[] {
  const { family } = useUser()

  return useMemo(() => {
    const bilanganAnak = family.senaraAnak.length
    const today = new Date()

    const anakBawaLima = family.senaraAnak.filter((a) => {
      if (!a.tarikhLahir) return false
      const umurBulan =
        (today.getFullYear() - new Date(a.tarikhLahir).getFullYear()) * 12 +
        (today.getMonth() - new Date(a.tarikhLahir).getMonth())
      return umurBulan < 60
    })

    const anakUsiaPrasekolah = family.senaraAnak.filter((a) => {
      if (!a.tarikhLahir) return false
      const umurTahun = today.getFullYear() - new Date(a.tarikhLahir).getFullYear()
      return umurTahun >= 4 && umurTahun <= 6
    })

    const anakBaru = family.senaraAnak.filter((a) => {
      if (!a.tarikhLahir) return false
      const bulan =
        (today.getFullYear() - new Date(a.tarikhLahir).getFullYear()) * 12 +
        (today.getMonth() - new Date(a.tarikhLahir).getMonth())
      return bulan <= 24
    })

    const bonusAnak = Math.min(bilanganAnak, 3) * 100

    const programs: BantuanItem[] = [
      {
        id: 'str2025',
        nama: 'Sumbangan Tunai Rahmah (STR) 2025',
        agensi: 'Lembaga Hasil Dalam Negeri (LHDN)',
        agensiPendek: 'LHDN',
        warna: 'hijau',
        iconPath: ICONS.cash,
        portalUrl: 'https://mystrbantuan.hasil.gov.my',
        perihal: 'Bantuan tunai tahunan untuk isi rumah berkelayakan',
        status: 'layak',
        jumlah: `RM ${(1000 + bonusAnak).toLocaleString()}`,
        butirButir: [
          { label: 'Bantuan isi rumah B40', nilai: 'RM 1,000 / tahun', highlight: true },
          { label: `Bonus anak (${bilanganAnak} anak × RM100)`, nilai: `RM ${bonusAnak}`, highlight: true },
          { label: 'Syarat pendapatan (B40)', nilai: '≤RM 4,500 / bulan' },
          { label: 'Syarat pendapatan (M40)', nilai: 'RM 4,501–10,000 → RM500' },
          { label: 'Semak / daftar', nilai: 'mystrbantuan.hasil.gov.my' },
        ],
      },
      {
        id: 'sps',
        nama: 'Skim Peduli Sihat (SPS)',
        agensi: 'Kementerian Kesihatan Malaysia',
        agensiPendek: 'KKM',
        warna: 'biru',
        iconPath: ICONS.heart,
        portalUrl: 'https://www.mysikap.com.my',
        perihal: 'Kredit kesihatan di klinik panel swasta untuk B40',
        status: 'layak',
        jumlah: 'RM 500 / orang',
        butirButir: [
          { label: 'Kredit tahunan', nilai: 'RM 500 per orang', highlight: true },
          { label: 'Liputan', nilai: 'Klinik panel swasta seluruh Malaysia' },
          { label: 'Anak layak', nilai: anakBawaLima.map((a) => a.nama.split(' ')[0]).join(', ') || 'Tiada' },
          { label: 'Daftar melalui', nilai: 'MySikap atau Pejabat Pos' },
        ],
      },
      ...(anakUsiaPrasekolah.length > 0
        ? [{
            id: 'prasekolah',
            nama: 'Bantuan Prasekolah KPM',
            agensi: 'Kementerian Pendidikan Malaysia',
            agensiPendek: 'KPM',
            warna: 'biru' as const,
            iconPath: ICONS.school,
            portalUrl: 'https://www.moe.gov.my',
            perihal: 'Yuran percuma & bantuan pakaian seragam prasekolah kerajaan',
            status: 'layak' as Status,
            jumlah: 'RM 100 + yuran percuma',
            butirButir: [
              { label: 'Anak layak', nilai: anakUsiaPrasekolah.map((a) => a.nama.split(' ')[0]).join(', '), highlight: true },
              { label: 'Yuran prasekolah', nilai: 'Percuma (sekolah kerajaan)', highlight: true },
              { label: 'Bantuan pakaian seragam', nilai: 'RM 100 / murid' },
              { label: 'Buku teks', nilai: 'Percuma' },
              { label: 'Daftar melalui', nilai: 'Sekolah kebangsaan berdekatan' },
            ],
          }]
        : [{
            id: 'prasekolah',
            nama: 'Bantuan Prasekolah KPM',
            agensi: 'Kementerian Pendidikan Malaysia',
            agensiPendek: 'KPM',
            warna: 'biru' as const,
            iconPath: ICONS.school,
            portalUrl: 'https://www.moe.gov.my',
            perihal: 'Yuran percuma & bantuan pakaian seragam prasekolah kerajaan',
            status: 'semak' as Status,
            sebab: 'Anak belum mencapai usia prasekolah (4–6 tahun)',
            butirButir: [
              { label: 'Usia layak', nilai: '4 – 6 tahun' },
              { label: 'Yuran prasekolah', nilai: 'Percuma (sekolah kerajaan)' },
              { label: 'Bantuan pakaian seragam', nilai: 'RM 100 / murid' },
            ],
          }]),
      {
        id: 'ppr',
        nama: 'Program Perumahan Rakyat (PPR)',
        agensi: 'Kementerian Perumahan & Kerajaan Tempatan',
        agensiPendek: 'KPKT',
        warna: 'oren',
        iconPath: ICONS.home,
        portalUrl: 'https://ehome.kpkt.gov.my',
        perihal: 'Perumahan kos rendah untuk isi rumah berpendapatan rendah',
        status: 'semak',
        butirButir: [
          { label: 'Syarat pendapatan', nilai: '≤RM 3,000 / bulan' },
          { label: 'Keutamaan', nilai: 'Isi rumah dengan anak kecil' },
          { label: 'Sewa bulanan', nilai: 'RM 124 – RM 250' },
          { label: 'Daftar melalui', nilai: 'e-SPKB / Pejabat daerah' },
        ],
      },
      ...(anakBaru.length > 0
        ? [{
            id: 'jkm-bersalin',
            nama: 'Bantuan Am Kebajikan (Bersalin)',
            agensi: 'Jabatan Kebajikan Masyarakat',
            agensiPendek: 'JKM',
            warna: 'ungu' as const,
            iconPath: ICONS.baby,
            portalUrl: 'https://www.jkm.gov.my',
            perihal: 'Bantuan sekali untuk keluarga B40 selepas kelahiran',
            status: 'semak' as Status,
            butirButir: [
              { label: 'Anak baru lahir', nilai: anakBaru.map((a) => a.nama.split(' ')[0]).join(', '), highlight: true },
              { label: 'Bantuan kelahiran', nilai: 'RM 300 (sekali)' },
              { label: 'Syarat', nilai: 'Berdaftar e-Kasih / B40' },
              { label: 'Daftar melalui', nilai: 'Pejabat JKM negeri' },
            ],
          }]
        : []),
      {
        id: 'mykid',
        nama: 'MyKid — Kad Pengenalan Kanak-kanak',
        agensi: 'Jabatan Pendaftaran Negara',
        agensiPendek: 'JPN',
        warna: 'ungu',
        iconPath: ICONS.card,
        portalUrl: 'https://www.jpn.gov.my',
        perihal: 'Pendaftaran kad pengenalan untuk anak di bawah 12 tahun',
        status: bilanganAnak > 0 ? 'semak' : 'tidak',
        sebab: bilanganAnak === 0 ? 'Tiada rekod anak dalam profil' : undefined,
        butirButir: [
          { label: 'Bil. anak dalam profil', nilai: `${bilanganAnak} orang` },
          { label: 'Yuran', nilai: 'Percuma' },
          { label: 'Dokumen diperlukan', nilai: 'Sijil lahir + IC ibu bapa' },
          { label: 'Daftar melalui', nilai: 'Pejabat JPN atau online' },
        ],
      },
    ]

    return programs
  }, [family])
}

/* ── Card Component ── */
function BantuanCard({ item, onOpen }: { item: BantuanItem; onOpen: (item: BantuanItem) => void }) {
  const bgWarna = WARNA_BG[item.warna]
  const textWarna = WARNA_TEXT[item.warna]
  const st = STATUS_COLOR[item.status]

  return (
    <div className={`ban-card ban-card--${item.status}`}>
      <div className="ban-card__top">
        <div className="ban-card__icon" style={{ background: bgWarna }}>
          <BantuanSvgIcon path={item.iconPath} color={textWarna} />
        </div>
        <div className="ban-card__body">
          <p className="ban-card__name">{item.nama}</p>
          <p className="ban-card__agensi">{item.agensiPendek}</p>
        </div>
        <span className="ban-card__badge" style={{ background: st.bg, color: st.text }}>
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      {item.jumlah && (
        <div className="ban-card__amount">
          <span className="ban-card__amount-label">Anggaran bantuan</span>
          <span className="ban-card__amount-val">{item.jumlah}</span>
        </div>
      )}

      {item.sebab && (
        <p className="ban-card__sebab">{item.sebab}</p>
      )}

      <div className="ban-card__footer">
        <button type="button" className="ban-btn ban-btn--ghost" onClick={() => onOpen(item)}>
          Butiran
        </button>
        {item.status !== 'tidak' && (
          <a
            href={item.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ban-btn ban-btn--primary"
            style={{ background: bgWarna, color: textWarna }}
          >
            Semak kelayakan
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
              <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Detail Sheet ── */
function DetailSheet({ item, onClose }: { item: BantuanItem; onClose: () => void }) {
  const bgWarna = WARNA_BG[item.warna]
  const textWarna = WARNA_TEXT[item.warna]
  const st = STATUS_COLOR[item.status]

  return (
    <div className="ban-overlay" onClick={onClose}>
      <div className="ban-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="ban-sheet__header">
          <div className="ban-sheet__icon" style={{ background: bgWarna }}>
            <BantuanSvgIcon path={item.iconPath} color={textWarna} />
          </div>
          <div className="ban-sheet__header-text">
            <p className="ban-sheet__name">{item.nama}</p>
            <p className="ban-sheet__agensi">{item.agensi}</p>
          </div>
          <button type="button" className="ban-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="ban-sheet__body">
          <div className="ban-sheet__status-row">
            <span className="ban-card__badge" style={{ background: st.bg, color: st.text, fontSize: '0.8125rem', padding: '4px 12px' }}>
              {STATUS_LABEL[item.status]}
            </span>
            {item.jumlah && <span className="ban-sheet__jumlah">{item.jumlah}</span>}
          </div>

          <p className="ban-sheet__perihal">{item.perihal}</p>

          <div className="ban-sheet__rows">
            {item.butirButir.map((b, i) => (
              <div key={i} className={`ban-sheet__row ${b.highlight ? 'ban-sheet__row--highlight' : ''}`}>
                <span className="ban-sheet__row-label">{b.label}</span>
                <span className="ban-sheet__row-val" style={b.highlight ? { color: textWarna, fontWeight: 600 } : {}}>
                  {b.nilai}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ban-sheet__footer">
          {item.status !== 'tidak' && (
            <a
              href={item.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary ban-sheet__portal-btn"
            >
              Buka Portal Rasmi
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <path d="M4 8h8M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          <button type="button" className="btn btn--secondary" onClick={onClose}>Tutup</button>
        </div>
      </div>
    </div>
  )
}

/* ── Summary strip ── */
function SummaryStrip({ items }: { items: BantuanItem[] }) {
  const layak = items.filter((i) => i.status === 'layak').length
  const semak = items.filter((i) => i.status === 'semak').length
  const anggaran = items
    .filter((i) => i.status === 'layak' && i.jumlah)
    .reduce((acc, i) => {
      const match = i.jumlah?.match(/[\d,]+/)
      return acc + (match ? parseInt(match[0].replace(',', '')) : 0)
    }, 0)

  return (
    <div className="ban-summary">
      <div className="ban-summary__item">
        <span className="ban-summary__num ban-summary__num--green">{layak}</span>
        <span className="ban-summary__label">Layak</span>
      </div>
      <div className="ban-summary__divider" />
      <div className="ban-summary__item">
        <span className="ban-summary__num ban-summary__num--amber">{semak}</span>
        <span className="ban-summary__label">Perlu semak</span>
      </div>
      <div className="ban-summary__divider" />
      <div className="ban-summary__item">
        <span className="ban-summary__num ban-summary__num--green">
          RM {anggaran.toLocaleString()}
        </span>
        <span className="ban-summary__label">Anggaran setahun</span>
      </div>
    </div>
  )
}

/* ── Main Page ── */
interface BantuanPageProps {
  onBack: () => void
}

export function BantuanPage({ onBack }: BantuanPageProps) {
  const items = useBantuanList()
  const [selected, setSelected] = useState<BantuanItem | null>(null)

  return (
    <div className="info-page info-page--modern ban-page">
      <header className="info-page__header">
        <button type="button" className="info-page__back" onClick={onBack} aria-label="Kembali">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="info-page__header-text">
          <p className="info-page__eyebrow">Kerajaan Malaysia · 2025</p>
          <h1 className="info-page__title">Bantuan yang Layak</h1>
        </div>
      </header>

      <main className="info-page__content" style={{ paddingTop: 16 }}>
        <SummaryStrip items={items} />

        <p className="ban-disclaimer">
          Disusun berdasarkan profil keluarga anda. Jumlah sebenar bergantung pada pendapatan isi rumah dan status e-Kasih.
        </p>

        <div className="ban-list">
          {items.map((item) => (
            <BantuanCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </main>

      {selected && <DetailSheet item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
