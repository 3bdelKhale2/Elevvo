import { Link, useLocation } from 'react-router-dom'
import { useJobs } from '../state/JobsContext.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { jobs, importJobs } = useJobs()
  const loc = useLocation()
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  function exportJson() {
    const data = JSON.stringify(jobs, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const a = document.createElement('a')
    const ts = new Date().toISOString().slice(0, 10).replaceAll('-', '')
    a.href = URL.createObjectURL(blob)
    a.download = `job-applications-${ts}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  function exportTxt() {
    const lines = []
    const ts = new Date().toISOString().slice(0, 10)
    lines.push(`Job Applications — Export ${ts}`)
    lines.push(`Total: ${jobs.length}`)
    lines.push('')
    for (const j of jobs) {
      const date = j.dateApplied || '-'
      const notes = (j.notes || '').replace(/\s+/g, ' ').trim()
      lines.push(`- [${j.status}] ${j.company} — ${j.title} (${date})`)
      if (notes) lines.push(`  Notes: ${notes}`)
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    const name = `job-applications-${ts.replaceAll('-', '')}.txt`
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  async function onImportFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = JSON.parse(text)
      const arr = Array.isArray(parsed) ? parsed : parsed?.jobs
      if (!Array.isArray(arr)) {
        alert('Invalid JSON format. Expecting an array of job objects or { jobs: [] }')
        return
      }
      const overwrite = window.confirm(
        'Import detected. Click OK to overwrite matching entries by ID, or Cancel to merge without overwriting.'
      )
      importJobs(arr, overwrite)
      alert('Import complete.')
    } catch (err) {
      console.error(err)
      alert('Failed to import JSON.')
    } finally {
      e.target.value = ''
    }
  }

  const isAdd = loc.pathname === '/add'

  return (
    <header className="navbar">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link to="/" className="text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity">
          <span className="inline-flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" className="text-brand">
              <path fill="currentColor" d="M4 7h16v2H4zm0 4h10v2H4zm0 4h16v2H4z"/>
            </svg>
            <span className="brand-text">Job Tracker</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {!isAdd && (
            <Link className="btn btn-primary hover-lift" to="/add" title="Add Job">
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2z"/></svg>
              <span className="hidden sm:inline">Add Job</span>
            </Link>
          )}
          <button className="btn btn-secondary hover-lift" onClick={exportTxt} title="Export to TXT">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16l4-4h10a2 2 0 0 0 2-2V8zM13 3.5L18.5 9H14a1 1 0 0 1-1-1z"/></svg>
            <span className="hidden sm:inline">Export .txt</span>
          </button>
          <button className="btn btn-secondary hover-lift" onClick={exportJson} title="Export to JSON">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20h14v-2H5v2zM12 2l5.5 5.5-1.42 1.42L13 6.83V16h-2V6.83L7.92 8.92 6.5 7.5 12 2z"/></svg>
            <span className="hidden sm:inline">Export</span>
          </button>
          <label className="btn btn-secondary hover-lift cursor-pointer" title="Import from JSON">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 20h14v-2H5v2z"/></svg>
            <span className="hidden sm:inline">Import</span>
            <input type="file" accept="application/json,.json" className="hidden" onChange={onImportFile} />
          </label>
          <button
            className="btn btn-secondary hover-lift"
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79zm10.48 0l1.79-1.79l1.79 1.79l-1.79 1.79zM12 4a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm0 12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zM4 11h2a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm14 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zM6.34 17.66l-1.8 1.79l1.79 1.79l1.79-1.79zM17.66 17.66l1.79 1.79l1.79-1.79l-1.79-1.79zM7 12a5 5 0 1 0 10 0a5 5 0 0 0-10 0z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M21.64 13a9 9 0 1 1-10.63-10.6a1 1 0 0 1 1.11 1.46A7 7 0 1 0 20.18 12a1 1 0 0 1 1.46 1.11z"/></svg>
            )}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}