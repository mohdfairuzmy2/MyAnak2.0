import type { BirthRegistrationForm } from '../../types/birthRegistration'
import {
  EDUCATION_LEVELS,
  ID_TYPES,
  MARITAL_STATUS,
  STATES,
  initialChild,
} from '../../types/birthRegistration'
import { FormField, FormInput, FormSelect, FormInfoBanner, FormSection } from './FormFields'

interface StepProps {
  form: BirthRegistrationForm
  update: (patch: Partial<BirthRegistrationForm>) => void
}

export function MotherStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormField label="Jenis Dokumen Pengenalan Ibu" required>
        <FormSelect
          options={ID_TYPES}
          value={form.motherIdType}
          onChange={(e) => update({ motherIdType: e.target.value })}
        />
      </FormField>

      <FormField label="No. Dokumen Pengenalan Ibu" required>
        <FormInput
          value={form.motherIdNumber}
          onChange={(e) => update({ motherIdNumber: e.target.value })}
          placeholder="Contoh: 880101015432"
          inputMode="numeric"
        />
      </FormField>

      <FormField label="Nama Penuh Ibu" required>
        <FormInput
          value={form.motherFullName}
          onChange={(e) => update({ motherFullName: e.target.value })}
          placeholder="Seperti dalam kad pengenalan"
        />
      </FormField>

      <FormField label="Alamat" required>
        <FormInput
          value={form.motherAddress1}
          onChange={(e) => update({ motherAddress1: e.target.value })}
          placeholder="Alamat baris 1"
          className="form-input--mb"
        />
        <FormInput
          value={form.motherAddress2}
          onChange={(e) => update({ motherAddress2: e.target.value })}
          placeholder="Alamat baris 2 (pilihan)"
          className="form-input--mb"
        />
        <FormInput
          value={form.motherAddress3}
          onChange={(e) => update({ motherAddress3: e.target.value })}
          placeholder="Alamat baris 3 (pilihan)"
        />
      </FormField>

      <div className="form-row">
        <FormField label="Poskod" required>
          <FormInput
            value={form.motherPostcode}
            onChange={(e) => update({ motherPostcode: e.target.value })}
            inputMode="numeric"
            maxLength={5}
          />
        </FormField>
        <FormField label="Negeri" required>
          <FormSelect
            options={STATES}
            value={form.motherState}
            onChange={(e) => update({ motherState: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Bandar" required>
        <FormInput
          value={form.motherCity}
          onChange={(e) => update({ motherCity: e.target.value })}
        />
      </FormField>

      <div className="form-row">
        <FormField label="Pekerjaan" required>
          <FormInput
            value={form.motherOccupation}
            onChange={(e) => update({ motherOccupation: e.target.value })}
          />
        </FormField>
        <FormField label="Pendidikan" required>
          <FormSelect
            options={EDUCATION_LEVELS}
            value={form.motherEducation}
            onChange={(e) => update({ motherEducation: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="Taraf Perkahwinan" required>
        <FormSelect
          options={MARITAL_STATUS}
          value={form.motherMaritalStatus}
          onChange={(e) => update({ motherMaritalStatus: e.target.value })}
        />
      </FormField>

      <FormField label="No. Telefon" required hint="Contoh: 0123456789">
        <FormInput
          value={form.motherPhone}
          onChange={(e) => update({ motherPhone: e.target.value })}
          type="tel"
          inputMode="tel"
        />
      </FormField>
    </>
  )
}

export function BirthInfoStep({ form, update }: StepProps) {
  const isMultiple = form.isMultipleBirth === 'YA'

  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormField label="Adakah ini kelahiran kembar?" required>
        <FormSelect
          options={['YA', 'TIDAK']}
          value={form.isMultipleBirth}
          onChange={(e) => {
            const val = e.target.value
            update({
              isMultipleBirth: val,
              multipleBirthCount: val === 'YA' ? '2' : '1',
              children:
                val === 'YA'
                  ? [{ ...initialChild }, { ...initialChild }]
                  : [{ ...initialChild }],
            })
          }}
        />
      </FormField>

      {isMultiple && (
        <FormField label="Jumlah Kembar" required>
          <FormSelect
            options={['2', '3', '4', '5']}
            value={form.multipleBirthCount}
            onChange={(e) => {
              const count = parseInt(e.target.value, 10)
              const children = Array.from({ length: count }, (_, i) =>
                form.children[i] ?? { ...initialChild },
              )
              update({ multipleBirthCount: e.target.value, children })
            }}
          />
        </FormField>
      )}

      <div className="form-row">
        <FormField label="Tarikh Kelahiran (Dari)" required>
          <FormInput
            type="date"
            value={form.birthDateFrom}
            onChange={(e) => update({ birthDateFrom: e.target.value })}
          />
        </FormField>
        <FormField label="Tarikh Kelahiran (Hingga)" required={isMultiple}>
          <FormInput
            type="date"
            value={form.birthDateTo}
            onChange={(e) => update({ birthDateTo: e.target.value })}
            disabled={!isMultiple}
          />
        </FormField>
      </div>

      <FormField label="Tempat Kelahiran" required>
        <FormInput
          value={form.birthPlace1}
          onChange={(e) => update({ birthPlace1: e.target.value })}
          placeholder="Contoh: HOSPITAL PUTRAJAYA"
          className="form-input--mb"
        />
        <FormInput
          value={form.birthPlace2}
          onChange={(e) => update({ birthPlace2: e.target.value })}
          placeholder="Alamat hospital (pilihan)"
        />
      </FormField>

      <FormField label="Negeri Kelahiran" required>
        <FormSelect
          options={STATES}
          value={form.birthState}
          onChange={(e) => update({ birthState: e.target.value })}
        />
      </FormField>
    </>
  )
}

export function MarriageFatherStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormSection title="Maklumat Perkahwinan">
        <FormField label="Tarikh Perkahwinan" required>
          <FormInput
            type="date"
            value={form.marriageDate}
            onChange={(e) => update({ marriageDate: e.target.value })}
          />
        </FormField>

        <FormField label="Negara Perkahwinan" required>
          <FormInput
            value={form.marriageCountry}
            onChange={(e) => update({ marriageCountry: e.target.value })}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Negeri Perkahwinan" required>
            <FormSelect
              options={STATES}
              value={form.marriageState}
              onChange={(e) => update({ marriageState: e.target.value })}
            />
          </FormField>
          <FormField label="Daerah Perkahwinan" required>
            <FormInput
              value={form.marriageDistrict}
              onChange={(e) => update({ marriageDistrict: e.target.value })}
            />
          </FormField>
        </div>

        <FormField label="No. Daftar Perkahwinan" required>
          <FormInput
            value={form.marriageRegNumber}
            onChange={(e) => update({ marriageRegNumber: e.target.value })}
          />
        </FormField>
      </FormSection>

      <FormSection title="Maklumat Bapa">
        <FormField label="Jenis Dokumen Pengenalan Bapa" required>
          <FormSelect
            options={ID_TYPES}
            value={form.fatherIdType}
            onChange={(e) => update({ fatherIdType: e.target.value })}
          />
        </FormField>

        <FormField label="No. Dokumen Pengenalan Bapa" required>
          <FormInput
            value={form.fatherIdNumber}
            onChange={(e) => update({ fatherIdNumber: e.target.value })}
          />
        </FormField>

        <FormField label="Negara Pengeluar Dokumen" required>
          <FormInput
            value={form.fatherIssuingCountry}
            onChange={(e) => update({ fatherIssuingCountry: e.target.value })}
            placeholder="Contoh: MALAYSIA"
          />
        </FormField>

        <FormField label="Nama Penuh Bapa" required>
          <FormInput
            value={form.fatherFullName}
            onChange={(e) => update({ fatherFullName: e.target.value })}
          />
        </FormField>

        <FormField label="Tarikh Kelahiran Bapa" required>
          <FormInput
            type="date"
            value={form.fatherBirthDate}
            onChange={(e) => update({ fatherBirthDate: e.target.value })}
          />
        </FormField>

        <div className="form-row">
          <FormField label="Pekerjaan" required>
            <FormInput
              value={form.fatherOccupation}
              onChange={(e) => update({ fatherOccupation: e.target.value })}
            />
          </FormField>
          <FormField label="Pendidikan" required>
            <FormSelect
              options={EDUCATION_LEVELS}
              value={form.fatherEducation}
              onChange={(e) => update({ fatherEducation: e.target.value })}
            />
          </FormField>
        </div>

        <FormField label="No. Telefon Bapa" required>
          <FormInput
            value={form.fatherPhone}
            onChange={(e) => update({ fatherPhone: e.target.value })}
            type="tel"
          />
        </FormField>
      </FormSection>
    </>
  )
}

export function MarriageStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormField label="Tarikh Perkahwinan" required>
        <FormInput
          type="date"
          value={form.marriageDate}
          onChange={(e) => update({ marriageDate: e.target.value })}
        />
      </FormField>

      <FormField label="Negara Perkahwinan" required>
        <FormInput
          value={form.marriageCountry}
          onChange={(e) => update({ marriageCountry: e.target.value })}
        />
      </FormField>

      <div className="form-row">
        <FormField label="Negeri Perkahwinan" required>
          <FormSelect
            options={STATES}
            value={form.marriageState}
            onChange={(e) => update({ marriageState: e.target.value })}
          />
        </FormField>
        <FormField label="Daerah Perkahwinan" required>
          <FormInput
            value={form.marriageDistrict}
            onChange={(e) => update({ marriageDistrict: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="No. Daftar Perkahwinan" required>
        <FormInput
          value={form.marriageRegNumber}
          onChange={(e) => update({ marriageRegNumber: e.target.value })}
        />
      </FormField>
    </>
  )
}

export function FatherStep({ form, update }: StepProps) {
  return (
    <>
      <FormInfoBanner>Ruangan bertanda * wajib diisi</FormInfoBanner>

      <FormField label="Jenis Dokumen Pengenalan Bapa" required>
        <FormSelect
          options={ID_TYPES}
          value={form.fatherIdType}
          onChange={(e) => update({ fatherIdType: e.target.value })}
        />
      </FormField>

      <FormField label="No. Dokumen Pengenalan Bapa" required>
        <FormInput
          value={form.fatherIdNumber}
          onChange={(e) => update({ fatherIdNumber: e.target.value })}
        />
      </FormField>

      <FormField label="Negara Pengeluar Dokumen" required>
        <FormInput
          value={form.fatherIssuingCountry}
          onChange={(e) => update({ fatherIssuingCountry: e.target.value })}
          placeholder="Contoh: MALAYSIA"
        />
      </FormField>

      <FormField label="Nama Penuh Bapa" required>
        <FormInput
          value={form.fatherFullName}
          onChange={(e) => update({ fatherFullName: e.target.value })}
        />
      </FormField>

      <FormField label="Tarikh Kelahiran Bapa" required>
        <FormInput
          type="date"
          value={form.fatherBirthDate}
          onChange={(e) => update({ fatherBirthDate: e.target.value })}
        />
      </FormField>

      <div className="form-row">
        <FormField label="Pekerjaan" required>
          <FormInput
            value={form.fatherOccupation}
            onChange={(e) => update({ fatherOccupation: e.target.value })}
          />
        </FormField>
        <FormField label="Pendidikan" required>
          <FormSelect
            options={EDUCATION_LEVELS}
            value={form.fatherEducation}
            onChange={(e) => update({ fatherEducation: e.target.value })}
          />
        </FormField>
      </div>

      <FormField label="No. Telefon Bapa" required>
        <FormInput
          value={form.fatherPhone}
          onChange={(e) => update({ fatherPhone: e.target.value })}
          type="tel"
        />
      </FormField>
    </>
  )
}
