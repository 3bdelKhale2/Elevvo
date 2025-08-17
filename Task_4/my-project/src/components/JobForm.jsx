import { useState } from 'react'
import { STATUSES } from '../state/JobsContext.jsx'

export default function JobForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const [form, setForm] = useState(() => ({
    company: '',
    title: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().slice(0, 10),
    notes: '',
    ...initialValues
  }))
  const [errors, setErrors] = useState({})

  function validate(next) {
    const e = {}
    if (!next.company?.trim()) e.company = 'Required'
    if (!next.title?.trim()) e.title = 'Required'
    if (!STATUSES.includes(next.status)) e.status = 'Invalid'
    if (!next.dateApplied) e.dateApplied = 'Required'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const v = validate(form)
    setErrors(v)
    if (Object.keys(v).length === 0) {
      onSubmit({
        company: form.company,
        title: form.title,
        status: form.status,
        dateApplied: form.dateApplied,
        notes: form.notes
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 sm:p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Acme Inc."
          />
          {errors.company && <p className="text-xs text-rose-600 mt-1">{errors.company}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Frontend Engineer"
          />
          {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && <p className="text-xs text-rose-600 mt-1">{errors.status}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Application Date</label>
          <input
            type="date"
            name="dateApplied"
            value={form.dateApplied}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.dateApplied && <p className="text-xs text-rose-600 mt-1">{errors.dateApplied}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Interviewers, links, etc."
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  )
}