import { useState } from 'react'
import { useUser } from '../context/UserContext'
import type { Anak, Pasangan } from '../types/user'

interface ProfilePageProps {
  onImmunization: () => void
}

/* ── Helpers ── */
function maskIc(ic: string) {
  if (ic.length < 8) return ic
  return ic.slice(0, 6) + '-XX-' + ic.slice(-4)
}

function calcUmur(tarikhLahir: string): number {
  if (!tarikhLahir) return 0
  const today = new Date()
  const dob = new Date(tarikhLahir)
  let age = today.getFullYear() - dob.getFullYear()
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  )
    age--
  return age
}

function ageLabel(tarikhLahir: string): string {
  if (!tarikhLahir) return ''
  const dob = new Date(tarikhLahir)
  const today = new Date()
  const months =
    (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth())
  if (months < 1) return 'Baru lahir'
  if (months < 12) return `${months} bulan`
  const y = Math.floor(months / 12)
  const m = months % 12
  return m > 0 ? `${y} tahun ${m} bulan` : `${y} tahun`
}

const NEGERI_LIST = [
  'Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang',
  'Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor',
  'Terengganu','W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya',
]

/* ── Subcomponents ── */

function SectionHeader({ label }: { label: string }) {
  return <h2 className="prof-section-label">{label}</h2>
}

function ReadonlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="prof-row">
      <span className="prof-row__label">{label}</span>
      <span className="prof-row__value">{value}</span>
    </div>
  )
}

/* ── Add Child Modal ── */
function AddAnakSheet({
  onSave,
  onClose,
  initial,
}: {
  onSave: (data: Omit<Anak, 'id'>) => void
  onClose: () => void
  initial?: Omit<Anak, 'id'>
}) {
  const [form, setForm] = useState<Omit<Anak, 'id'>>(
    initial ?? { nama: '', noKad: '', tarikhLahir: '', jantina: 'lelaki' },
  )

  function set(key: keyof typeof form, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  const valid = form.nama.trim() && form.noKad.trim().length >= 12 && form.tarikhLahir

  return (
    <div className="prof-sheet-overlay" onClick={onClose}>
      <div className="prof-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="prof-sheet__header">
          <span className="prof-sheet__title">{initial ? 'Kemaskini Anak' : 'Tambah Anak'}</span>
          <button type="button" className="prof-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="prof-sheet__body">
          <label className="prof-field">
            <span>Nama penuh</span>
            <input className="form-input" placeholder="Contoh: AISYAH BINTI MOHD FAIRUZ"
              value={form.nama} onChange={(e) => set('nama', e.target.value.toUpperCase())} />
          </label>
          <label className="prof-field">
            <span>No. Kad Pengenalan / MyKid</span>
            <input className="form-input" placeholder="000101-14-1234" maxLength={14}
              value={form.noKad} onChange={(e) => set('noKad', e.target.value)} />
          </label>
          <label className="prof-field">
            <span>Tarikh lahir</span>
            <input className="form-input" type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={form.tarikhLahir} onChange={(e) => set('tarikhLahir', e.target.value)} />
          </label>
          <div className="prof-field">
            <span className="prof-field__label">Jantina</span>
            <div className="prof-radio-group">
              {(['lelaki', 'perempuan'] as const).map((j) => (
                <label key={j} className={`prof-radio ${form.jantina === j ? 'prof-radio--active' : ''}`}>
                  <input type="radio" name="jantina-anak" value={j}
                    checked={form.jantina === j} onChange={() => set('jantina', j)} />
                  {j === 'lelaki' ? '👦 Lelaki' : '👧 Perempuan'}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="prof-sheet__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose}>Batal</button>
          <button type="button" className="btn btn--primary" disabled={!valid}
            onClick={() => { if (valid) { onSave(form); onClose() } }}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Add Pasangan Modal ── */
function AddPasanganSheet({
  onSave, onClose, initial,
}: {
  onSave: (data: Pasangan) => void
  onClose: () => void
  initial?: Pasangan
}) {
  const [form, setForm] = useState<Pasangan>(initial ?? { nama: '', noKad: '' })
  const valid = form.nama.trim() && form.noKad.trim().length >= 12

  return (
    <div className="prof-sheet-overlay" onClick={onClose}>
      <div className="prof-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="prof-sheet__header">
          <span className="prof-sheet__title">{initial ? 'Kemaskini Pasangan' : 'Tambah Pasangan'}</span>
          <button type="button" className="prof-sheet__close" onClick={onClose} aria-label="Tutup">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="prof-sheet__body">
          <label className="prof-field">
            <span>Nama penuh</span>
            <input className="form-input" placeholder="Contoh: SITI AMINAH BINTI HASSAN"
              value={form.nama} onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value.toUpperCase() }))} />
          </label>
          <label className="prof-field">
            <span>No. Kad Pengenalan</span>
            <input className="form-input" placeholder="850101-14-5678" maxLength={14}
              value={form.noKad} onChange={(e) => setForm((p) => ({ ...p, noKad: e.target.value }))} />
          </label>
        </div>
        <div className="prof-sheet__footer">
          <button type="button" className="btn btn--secondary" onClick={onClose}>Batal</button>
          <button type="button" className="btn btn--primary" disabled={!valid}
            onClick={() => { if (valid) { onSave(form); onClose() } }}>
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export function ProfilePage({ onImmunization }: ProfilePageProps) {
  const { profile, family, updateEditable, updatePeranan, updatePasangan, addAnak, updateAnak, removeAnak } = useUser()

  const [editingAddress, setEditingAddress] = useState(false)
  const [editingPhone, setEditingPhone] = useState(false)
  const [addressDraft, setAddressDraft] = useState(profile.editable)
  const [phoneDraft, setPhoneDraft] = useState(profile.editable.telefon)
  const [showAddAnak, setShowAddAnak] = useState(false)
  const [editingAnak, setEditingAnak] = useState<Anak | null>(null)
  const [showAddPasangan, setShowAddPasangan] = useState(false)

  const perananLabel = profile.peranan === 'bapa' ? 'Bapa' : profile.peranan === 'ibu' ? 'Ibu' : 'Penjaga'

  return (
    <main className="tab-page prof-page">

      {/* ── Header ── */}
      <header className="prof-hero">
        <div className="prof-hero__avatar" aria-hidden="true">
          {profile.jpn.nama.charAt(0)}
        </div>
        <div className="prof-hero__info">
          <h1 className="prof-hero__name">{profile.jpn.nama.split(' ').slice(0, 3).join(' ')}</h1>
          <span className="prof-hero__badge">{perananLabel} · KIR</span>
        </div>
        <div className="prof-hero__jpn-tag" aria-label="Data dari JPN">
          <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
            <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM7 7.25V5.5h2v1.75l-.5 3h-1l-.5-3zM8 11.5a.75.75 0 110-1.5.75.75 0 010 1.5z" fill="currentColor"/>
          </svg>
          Data JPN
        </div>
      </header>

      <div className="prof-body">

        {/* ── JPN Data (read-only) ── */}
        <section className="prof-card">
          <div className="prof-card__head">
            <SectionHeader label="Maklumat Peribadi" />
            <span className="prof-card__jpn-chip">
              <svg viewBox="0 0 16 16" fill="none" width="10" height="10"><path d="M13 4L6 11 3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Disahkan JPN
            </span>
          </div>
          <ReadonlyRow label="Nama Penuh" value={profile.jpn.nama} />
          <ReadonlyRow label="No. Kad Pengenalan" value={maskIc(profile.jpn.noKad)} />
          <ReadonlyRow label="Umur" value={`${profile.jpn.umur} tahun`} />
          <ReadonlyRow label="Jantina" value={profile.jpn.jantina === 'lelaki' ? 'Lelaki' : 'Perempuan'} />

          {/* Peranan */}
          <div className="prof-row prof-row--peranan">
            <span className="prof-row__label">Peranan</span>
            <div className="prof-radio-group">
              {(['bapa', 'ibu', 'penjaga'] as const).map((p) => (
                <label key={p} className={`prof-radio ${profile.peranan === p ? 'prof-radio--active' : ''}`}>
                  <input type="radio" name="peranan" value={p}
                    checked={profile.peranan === p} onChange={() => updatePeranan(p)} />
                  {p === 'bapa' ? 'Bapa' : p === 'ibu' ? 'Ibu' : 'Penjaga'}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── Nombor Telefon ── */}
        <section className="prof-card">
          <div className="prof-card__head">
            <SectionHeader label="Nombor Telefon" />
            {!editingPhone && (
              <button type="button" className="prof-edit-btn"
                onClick={() => { setPhoneDraft(profile.editable.telefon); setEditingPhone(true) }}>
                {profile.editable.telefon ? 'Kemaskini' : 'Tambah'}
              </button>
            )}
          </div>
          {editingPhone ? (
            <div className="prof-edit-form">
              <input className="form-input" type="tel" placeholder="Contoh: 0123456789"
                value={phoneDraft} onChange={(e) => setPhoneDraft(e.target.value)} />
              <div className="prof-edit-actions">
                <button type="button" className="btn btn--secondary" onClick={() => setEditingPhone(false)}>Batal</button>
                <button type="button" className="btn btn--primary"
                  onClick={() => { updateEditable({ telefon: phoneDraft }); setEditingPhone(false) }}>
                  Simpan
                </button>
              </div>
            </div>
          ) : profile.editable.telefon ? (
            <ReadonlyRow label="Telefon" value={profile.editable.telefon} />
          ) : (
            <p className="prof-empty">Belum ditambah</p>
          )}
        </section>

        {/* ── Alamat ── */}
        <section className="prof-card">
          <div className="prof-card__head">
            <SectionHeader label="Alamat Kediaman" />
            {!editingAddress && (
              <button type="button" className="prof-edit-btn"
                onClick={() => { setAddressDraft(profile.editable); setEditingAddress(true) }}>
                {profile.editable.alamat ? 'Kemaskini' : 'Tambah'}
              </button>
            )}
          </div>

          {editingAddress ? (
            <div className="prof-edit-form">
              <label className="prof-field">
                <span>Alamat</span>
                <input className="form-input" placeholder="No. rumah, jalan, taman..."
                  value={addressDraft.alamat}
                  onChange={(e) => setAddressDraft((p) => ({ ...p, alamat: e.target.value }))} />
              </label>
              <div className="form-row">
                <label className="prof-field">
                  <span>Poskod</span>
                  <input className="form-input" placeholder="50000" maxLength={5}
                    value={addressDraft.poskod}
                    onChange={(e) => setAddressDraft((p) => ({ ...p, poskod: e.target.value }))} />
                </label>
                <label className="prof-field">
                  <span>Bandar</span>
                  <input className="form-input" placeholder="Kuala Lumpur"
                    value={addressDraft.bandar}
                    onChange={(e) => setAddressDraft((p) => ({ ...p, bandar: e.target.value }))} />
                </label>
              </div>
              <label className="prof-field">
                <span>Negeri</span>
                <select className="form-select" value={addressDraft.negeri}
                  onChange={(e) => setAddressDraft((p) => ({ ...p, negeri: e.target.value }))}>
                  <option value="">-- Pilih negeri --</option>
                  {NEGERI_LIST.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <div className="prof-edit-actions">
                <button type="button" className="btn btn--secondary" onClick={() => setEditingAddress(false)}>Batal</button>
                <button type="button" className="btn btn--primary"
                  onClick={() => { updateEditable(addressDraft); setEditingAddress(false) }}>
                  Simpan
                </button>
              </div>
            </div>
          ) : profile.editable.alamat ? (
            <>
              <ReadonlyRow label="Alamat" value={profile.editable.alamat} />
              {profile.editable.bandar && (
                <ReadonlyRow label="Bandar" value={`${profile.editable.poskod} ${profile.editable.bandar}`} />
              )}
              {profile.editable.negeri && <ReadonlyRow label="Negeri" value={profile.editable.negeri} />}
            </>
          ) : (
            <p className="prof-empty">Belum ditambah</p>
          )}
        </section>

        {/* ── Pasangan ── */}
        <section className="prof-card">
          <div className="prof-card__head">
            <SectionHeader label="Pasangan" />
            <button type="button" className="prof-edit-btn" onClick={() => setShowAddPasangan(true)}>
              {family.pasangan ? 'Kemaskini' : 'Tambah'}
            </button>
          </div>
          {family.pasangan ? (
            <>
              <ReadonlyRow label="Nama" value={family.pasangan.nama} />
              <ReadonlyRow label="No. Kad Pengenalan" value={maskIc(family.pasangan.noKad)} />
              <button type="button" className="prof-remove-btn"
                onClick={() => updatePasangan(null)}>
                Buang maklumat pasangan
              </button>
            </>
          ) : (
            <p className="prof-empty">Belum ditambah</p>
          )}
        </section>

        {/* ── Senarai Anak ── */}
        <section className="prof-card">
          <div className="prof-card__head">
            <SectionHeader label={`Senarai Anak (${family.senaraAnak.length})`} />
            <button type="button" className="prof-edit-btn" onClick={() => setShowAddAnak(true)}>
              + Tambah
            </button>
          </div>

          {family.senaraAnak.length === 0 ? (
            <p className="prof-empty">Tiada rekod anak</p>
          ) : (
            <div className="prof-anak-list">
              {family.senaraAnak.map((anak) => (
                <div key={anak.id} className="prof-anak-card">
                  <div className="prof-anak-card__avatar" aria-hidden="true">
                    {anak.jantina === 'lelaki' ? '👦' : '👧'}
                  </div>
                  <div className="prof-anak-card__info">
                    <p className="prof-anak-card__nama">{anak.nama}</p>
                    <p className="prof-anak-card__meta">
                      {maskIc(anak.noKad)}
                      {anak.tarikhLahir && ` · ${ageLabel(anak.tarikhLahir)}`}
                    </p>
                  </div>
                  <div className="prof-anak-card__actions">
                    <button type="button" className="prof-icon-btn"
                      aria-label="Kemaskini"
                      onClick={() => setEditingAnak(anak)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button type="button" className="prof-icon-btn prof-icon-btn--danger"
                      aria-label="Padam"
                      onClick={() => { if (confirm(`Padam rekod ${anak.nama}?`)) removeAnak(anak.id) }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {family.senaraAnak.length > 0 && (
            <button type="button" className="prof-link-btn" onClick={onImmunization}>
              Urus imunisasi anak →
            </button>
          )}
        </section>

      </div>

      {/* ── Sheets ── */}
      {showAddAnak && (
        <AddAnakSheet
          onSave={(data) => addAnak(data)}
          onClose={() => setShowAddAnak(false)}
        />
      )}
      {editingAnak && (
        <AddAnakSheet
          initial={editingAnak}
          onSave={(data) => updateAnak(editingAnak.id, data)}
          onClose={() => setEditingAnak(null)}
        />
      )}
      {showAddPasangan && (
        <AddPasanganSheet
          initial={family.pasangan ?? undefined}
          onSave={(data) => updatePasangan(data)}
          onClose={() => setShowAddPasangan(false)}
        />
      )}
    </main>
  )
}
