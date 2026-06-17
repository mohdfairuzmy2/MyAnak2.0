import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}

export function FormField({ label, required, hint, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__required"> *</span>}
      </label>
      {children}
      {hint && <p className="form-field__hint">{hint}</p>}
    </div>
  )
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function FormInput({ error, className = '', ...props }: FormInputProps) {
  return (
    <input
      className={`form-input${error ? ' form-input--error' : ''} ${className}`.trim()}
      {...props}
    />
  )
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  placeholder?: string
  options: string[]
}

export function FormSelect({
  error,
  placeholder = 'Sila pilih',
  options,
  ...props
}: FormSelectProps) {
  return (
    <select
      className={`form-select${error ? ' form-input--error' : ''}`}
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function FormTextarea({ error, ...props }: FormTextareaProps) {
  return (
    <textarea
      className={`form-textarea${error ? ' form-input--error' : ''}`}
      {...props}
    />
  )
}

export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="form-section">
      <h3 className="form-section__title">{title}</h3>
      <div className="form-section__body">{children}</div>
    </section>
  )
}

export function FormInfoBanner({ children }: { children: ReactNode }) {
  return <div className="form-info-banner">{children}</div>
}

interface RadioGroupProps {
  name: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

export function RadioGroup({ name, value, options, onChange }: RadioGroupProps) {
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt} className="radio-group__item">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  )
}
