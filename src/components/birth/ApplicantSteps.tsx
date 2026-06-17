import type { BirthRegistrationForm, ChildInfo } from '../../types/birthRegistration'
import {
  GENDERS,
  ID_TYPES,
  RELATIONSHIPS,
  STATES,
  TIME_PERIODS,
} from '../../types/birthRegistration'
import { FormField, FormInput, FormSelect, FormInfoBanner, RadioGroup } from './FormFields'

interface StepProps {
  form: BirthRegistrationForm
  update: (patch: Partial<BirthRegistrationForm>) => void
}

function updateChild(
  children: ChildInfo[],
  index: number,
  patch: Partial<ChildInfo>,
): ChildInfo[] {
  return children.map((c, i) => (i === index ? { ...c, ...patch } : c))
}

export function ChildStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      {form.children.map((child, index) => (
        <div key={index} className="child-card">
          <h3 className="child-card__title">
            Maklumat Anak {form.children.length > 1 ? index + 1 : ''}
          </h3>

          <FormField label="Nama Anak" required>
            <FormInput
              value={child.name}
              onChange={(e) =>
                update({ children: updateChild(form.children, index, { name: e.target.value }) })
              }
              placeholder="Nama penuh anak"
            />
          </FormField>

          <FormField label="Jantina" required>
            <FormSelect
              options={GENDERS}
              value={child.gender}
              onChange={(e) =>
                update({ children: updateChild(form.children, index, { gender: e.target.value }) })
              }
            />
          </FormField>

          <FormField label="Tarikh Kelahiran" required>
            <FormInput
              type="date"
              value={child.birthDate}
              onChange={(e) =>
                update({ children: updateChild(form.children, index, { birthDate: e.target.value }) })
              }
            />
          </FormField>

          <FormField label="Waktu Kelahiran" required hint="Format 24 jam, contoh: 1430">
            <FormInput
              value={child.birthTime}
              onChange={(e) =>
                update({ children: updateChild(form.children, index, { birthTime: e.target.value }) })
              }
              placeholder="1430"
              inputMode="numeric"
              maxLength={4}
              className="form-input--mb"
            />
            <RadioGroup
              name={`time-${index}`}
              value={child.birthTimePeriod}
              options={TIME_PERIODS}
              onChange={(val) =>
                update({ children: updateChild(form.children, index, { birthTimePeriod: val }) })
              }
            />
          </FormField>

          <div className="form-row">
            <FormField label="Berat (kg)" required>
              <FormInput
                value={child.weight}
                onChange={(e) =>
                  update({ children: updateChild(form.children, index, { weight: e.target.value }) })
                }
                inputMode="decimal"
                placeholder="3.2"
              />
            </FormField>
            <FormField label="Ukuran (cm)" required>
              <FormInput
                value={child.length}
                onChange={(e) =>
                  update({ children: updateChild(form.children, index, { length: e.target.value }) })
                }
                inputMode="decimal"
                placeholder="50"
              />
            </FormField>
          </div>
        </div>
      ))}

      {form.birthPlace1 && (
        <div className="readonly-info">
          <p className="readonly-info__label">Tempat Kelahiran</p>
          <p className="readonly-info__value">
            {form.birthPlace1}
            {form.birthPlace2 && `, ${form.birthPlace2}`}
          </p>
          <p className="readonly-info__value">{form.birthState}</p>
        </div>
      )}
    </>
  )
}

export function ApplicantStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormField label="Jenis Dokumen Pengenalan Pemohon" required>
        <FormSelect
          options={ID_TYPES}
          value={form.applicantIdType}
          onChange={(e) => update({ applicantIdType: e.target.value })}
        />
      </FormField>

      <FormField label="No. Dokumen Pengenalan" required>
        <FormInput
          value={form.applicantIdNumber}
          onChange={(e) => update({ applicantIdNumber: e.target.value })}
        />
      </FormField>

      <FormField label="Nama Penuh Pemohon" required>
        <FormInput
          value={form.applicantFullName}
          onChange={(e) => update({ applicantFullName: e.target.value })}
        />
      </FormField>

      <FormField label="Tarikh Kelahiran Pemohon" required>
        <FormInput
          type="date"
          value={form.applicantBirthDate}
          onChange={(e) => update({ applicantBirthDate: e.target.value })}
        />
      </FormField>

      <FormField label="Hubungan dengan Bayi" required>
        <FormSelect
          options={RELATIONSHIPS}
          value={form.applicantRelationship}
          onChange={(e) => update({ applicantRelationship: e.target.value })}
        />
      </FormField>

      <FormField label="Alamat Terkini" required>
        <FormInput
          value={form.applicantAddress1}
          onChange={(e) => update({ applicantAddress1: e.target.value })}
          placeholder="Alamat baris 1"
          className="form-input--mb"
        />
        <FormInput
          value={form.applicantAddress2}
          onChange={(e) => update({ applicantAddress2: e.target.value })}
          placeholder="Alamat baris 2 (pilihan)"
          className="form-input--mb"
        />
        <FormInput
          value={form.applicantAddress3}
          onChange={(e) => update({ applicantAddress3: e.target.value })}
          placeholder="Alamat baris 3 (pilihan)"
        />
      </FormField>

      <div className="form-row">
        <FormField label="Poskod" required>
          <FormInput
            value={form.applicantPostcode}
            onChange={(e) => update({ applicantPostcode: e.target.value })}
            inputMode="numeric"
            maxLength={5}
          />
        </FormField>
        <FormField label="Negeri" required>
          <FormSelect
            options={STATES}
            value={form.applicantState}
            onChange={(e) => update({ applicantState: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Bandar" required>
        <FormInput
          value={form.applicantCity}
          onChange={(e) => update({ applicantCity: e.target.value })}
        />
      </FormField>

      <FormField label="No. Telefon" required>
        <FormInput
          value={form.applicantPhone}
          onChange={(e) => update({ applicantPhone: e.target.value })}
          type="tel"
        />
      </FormField>

      <FormField label="Emel" required hint="Slip permohonan akan dihantar ke emel ini">
        <FormInput
          value={form.applicantEmail}
          onChange={(e) => update({ applicantEmail: e.target.value })}
          type="email"
          inputMode="email"
          placeholder="nama@email.com"
        />
      </FormField>
    </>
  )
}

export function ConfirmStep({ form }: { form: BirthRegistrationForm }) {
  return (
    <>
      <div className="confirm-banner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </svg>
        <p>
          Sila semak maklumat di bawah. Dengan meneruskan, anda mengaku bahawa semua maklumat
          adalah betul dan benar.
        </p>
      </div>

      <SummarySection title="Maklumat Ibu">
        <SummaryRow label="Nama" value={form.motherFullName} />
        <SummaryRow label="No. ID" value={form.motherIdNumber} />
        <SummaryRow label="Telefon" value={form.motherPhone} />
      </SummarySection>

      <SummarySection title="Maklumat Kelahiran">
        <SummaryRow label="Kembar" value={form.isMultipleBirth} />
        <SummaryRow label="Tempat" value={form.birthPlace1} />
        <SummaryRow label="Negeri" value={form.birthState} />
      </SummarySection>

      <SummarySection title="Maklumat Bapa">
        <SummaryRow label="Nama" value={form.fatherFullName} />
        <SummaryRow label="No. ID" value={form.fatherIdNumber} />
      </SummarySection>

      {form.children.map((child, i) => (
        <SummarySection key={i} title={`Maklumat Anak ${form.children.length > 1 ? i + 1 : ''}`}>
          <SummaryRow label="Nama" value={child.name} />
          <SummaryRow label="Jantina" value={child.gender} />
          <SummaryRow label="Berat" value={child.weight ? `${child.weight} kg` : ''} />
        </SummarySection>
      ))}

      <SummarySection title="Maklumat Pemohon">
        <SummaryRow label="Nama" value={form.applicantFullName} />
        <SummaryRow label="Hubungan" value={form.applicantRelationship} />
        <SummaryRow label="Emel" value={form.applicantEmail} />
      </SummarySection>
    </>
  )
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="summary-section">
      <h3 className="summary-section__title">{title}</h3>
      <div className="summary-section__body">{children}</div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div className="summary-row">
      <span className="summary-row__label">{label}</span>
      <span className="summary-row__value">{value}</span>
    </div>
  )
}

interface SuccessStepProps {
  referenceNo: string
  onDone: () => void
}

export function SuccessStep({ referenceNo, onDone }: SuccessStepProps) {
  return (
    <div className="birth-flow birth-flow--success">
      <main className="birth-flow__content birth-flow__content--center">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="success-title">Permohonan Berjaya!</h1>
        <p className="success-ref">No. Slip: {referenceNo}</p>

        <div className="success-alert">
          <h3>Langkah Seterusnya</h3>
          <ul>
            <li>
              Hadir ke pejabat JPN berdekatan dalam tempoh <strong>150 hari</strong> (Semenanjung)
              dari tarikh kelahiran.
            </li>
            <li>Bawa dokumen asal: borang JPN.LM01, pengesahan hospital, kad pengenalan, sijil nikah, dan buku pink.</li>
            <li>Permohonan akan terbatal jika tidak hadir dalam tempoh ditetapkan.</li>
          </ul>
        </div>
      </main>

      <footer className="birth-flow__footer">
        <div className="form-actions form-actions--single">
          <button type="button" className="btn btn--primary" onClick={onDone}>
            Kembali ke Utama
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => window.print()}>
            Cetak Slip
          </button>
        </div>
      </footer>
    </div>
  )
}