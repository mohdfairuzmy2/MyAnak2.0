export interface BirthRegistrationForm {
  // Maklumat Ibu
  motherIdType: string
  motherIdNumber: string
  motherFullName: string
  motherAddress1: string
  motherAddress2: string
  motherAddress3: string
  motherPostcode: string
  motherState: string
  motherCity: string
  motherOccupation: string
  motherEducation: string
  motherMaritalStatus: string
  motherPhone: string

  // Maklumat Kelahiran
  isMultipleBirth: string
  multipleBirthCount: string
  birthDateFrom: string
  birthDateTo: string
  birthPlace1: string
  birthPlace2: string
  birthState: string

  // Maklumat Perkahwinan
  marriageDate: string
  marriageCountry: string
  marriageState: string
  marriageDistrict: string
  marriageRegNumber: string

  // Maklumat Bapa
  fatherIdType: string
  fatherIdNumber: string
  fatherIssuingCountry: string
  fatherFullName: string
  fatherBirthDate: string
  fatherOccupation: string
  fatherEducation: string
  fatherPhone: string

  // Maklumat Anak (array for kembar)
  children: ChildInfo[]

  // Maklumat Pemohon
  applicantIdType: string
  applicantIdNumber: string
  applicantFullName: string
  applicantBirthDate: string
  applicantRelationship: string
  applicantAddress1: string
  applicantAddress2: string
  applicantAddress3: string
  applicantPostcode: string
  applicantState: string
  applicantCity: string
  applicantPhone: string
  applicantEmail: string
}

export interface ChildInfo {
  name: string
  gender: string
  birthDate: string
  birthTime: string
  birthTimePeriod: string
  weight: string
  length: string
}

export const initialChild: ChildInfo = {
  name: '',
  gender: '',
  birthDate: '',
  birthTime: '',
  birthTimePeriod: 'AM',
  weight: '',
  length: '',
}

export const initialForm: BirthRegistrationForm = {
  motherIdType: '',
  motherIdNumber: '',
  motherFullName: '',
  motherAddress1: '',
  motherAddress2: '',
  motherAddress3: '',
  motherPostcode: '',
  motherState: '',
  motherCity: '',
  motherOccupation: '',
  motherEducation: '',
  motherMaritalStatus: '',
  motherPhone: '',

  isMultipleBirth: '',
  multipleBirthCount: '1',
  birthDateFrom: '',
  birthDateTo: '',
  birthPlace1: '',
  birthPlace2: '',
  birthState: '',

  marriageDate: '',
  marriageCountry: 'MALAYSIA',
  marriageState: '',
  marriageDistrict: '',
  marriageRegNumber: '',

  fatherIdType: '',
  fatherIdNumber: '',
  fatherIssuingCountry: '',
  fatherFullName: '',
  fatherBirthDate: '',
  fatherOccupation: '',
  fatherEducation: '',
  fatherPhone: '',

  children: [{ ...initialChild }],

  applicantIdType: '',
  applicantIdNumber: '',
  applicantFullName: '',
  applicantBirthDate: '',
  applicantRelationship: '',
  applicantAddress1: '',
  applicantAddress2: '',
  applicantAddress3: '',
  applicantPostcode: '',
  applicantState: '',
  applicantCity: '',
  applicantPhone: '',
  applicantEmail: '',
}

export const ID_TYPES = ['MYKAD', 'MYPR', 'MYKAS', 'PASPORT']
export const EDUCATION_LEVELS = ['PT3/PMR', 'SPM', 'STPM', 'DIPLOMA', 'IJAZAH', 'PHD']
export const MARITAL_STATUS = ['BERKAHWIN', 'BELUM BERKAHWIN', 'JANDA', 'DUDA']
export const STATES = [
  'JOHOR', 'KEDAH', 'KELANTAN', 'MELAKA', 'NEGERI SEMBILAN',
  'PAHANG', 'PERAK', 'PERLIS', 'PULAU PINANG', 'SABAH',
  'SARAWAK', 'SELANGOR', 'TERENGGANU', 'W.P. KUALA LUMPUR',
  'W.P. LABUAN', 'W.P. PUTRAJAYA',
]
export const GENDERS = ['LELAKI', 'PEREMPUAN']
export const TIME_PERIODS = ['AM', 'TENGAHARI', 'PM', 'TGHMALAM']
export const RELATIONSHIPS = ['IBU', 'BAPA', 'IBU SAUDARA', 'BAPA SAUDARA', 'PENJAGA']
export const MULTIPLE_BIRTH_COUNTS = ['2', '3', '4', '5']
