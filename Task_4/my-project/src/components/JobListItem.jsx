import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'

function statusClass(status) {
  switch (status) {
    case 'Applied':
      return 'badge badge-applied'
    case 'Interviewing':
      return 'badge badge-interviewing'
    case 'Offer':
      return 'badge badge-offer'
    case 'Rejected':
      return 'badge badge-rejected'
    default:
      return 'badge'
  }
}

function accentClass(status) {
  switch (status) {
    case 'Applied':
      return 'from-indigo-500 to-blue-500'
    case 'Interviewing':
      return 'from-amber-500 to-orange-500'
    case 'Offer':
      return 'from-emerald-500 to-teal-500'
    case 'Rejected':
      return 'from-rose-500 to-pink-500'
    default:
      return 'from-slate-400 to-slate-500'
  }
}

export default function JobListItem({ job }) {
  const date = job.dateApplied ? new Date(job.dateApplied).toLocaleDateString() : '-'
  const initials = (job.company || '?').trim().charAt(0).toUpperCase()
  const accent = accentClass(job.status)

  return (
    <Link
      to={`/job/${job.id}`}
      className="group relative block card p-4 sm:p-5 hover-lift transition-shadow hover:shadow-xl"
      title="View details"
    >
      {/* Left accent */}
      <div className={`absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b ${accent}`} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="grid place-items-center h-10 w-10 rounded-full bg-white/80 ring-1 ring-white/70 shadow-sm">
            <span className="text-sm font-semibold text-slate-700">{initials}</span>
          </div>
          <div>
            <div className="text-sm text-slate-500">{job.company}</div>
            <div className="font-semibold text-slate-900">{job.title}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={job.status} />
          <div className="text-sm text-slate-500">{date}</div>
          <svg className="chev h-4 w-4 text-slate-400 opacity-0 transition-all duration-300" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9 18l6-6-6-6v12z"/>
          </svg>
        </div>
      </div>
    </Link>
  )
}