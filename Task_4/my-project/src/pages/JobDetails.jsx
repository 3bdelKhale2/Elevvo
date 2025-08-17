import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useJobs } from '../state/JobsContext.jsx'
import JobForm from '../components/JobForm.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function JobDetails() {
  const { id } = useParams()
  const { jobs, remove, update } = useJobs()
  const job = useMemo(() => jobs.find(j => j.id === id), [jobs, id])
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)

  if (!job) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Job Not Found</h1>
        <p className="text-gray-600">The job you’re looking for does not exist.</p>
      </section>
    )
  }

  function onDelete() {
    if (window.confirm('Delete this job? This cannot be undone.')) {
      remove(job.id)
      navigate('/')
    }
  }

  function onEditSubmit(values) {
    update(job.id, values)
    setEditing(false)
  }

  const date = job.dateApplied ? new Date(job.dateApplied).toLocaleDateString() : '-'

  return (
    <section className="space-y-5 animate-appear">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Details</h1>
          {!editing && <div className="mt-2"><StatusBadge status={job.status} /></div>}
        </div>
        <div className="flex gap-2">
          {!editing && (
            <button className="btn btn-secondary hover-lift" onClick={() => setEditing(true)}>Edit</button>
          )}
          <button className="btn btn-destructive hover-lift" onClick={onDelete}>Delete</button>
        </div>
      </div>

      {editing ? (
        <JobForm initialValues={job} onSubmit={onEditSubmit} submitLabel="Save Changes" />
      ) : (
        <div className="card p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <div className="text-sm text-slate-500">Company</div>
              <div className="mt-1 font-semibold">{job.company}</div>
            </div>

            <div>
              <div className="text-sm text-slate-500">Job Title</div>
              <div className="mt-1 font-semibold">{job.title}</div>
            </div>

            <div>
              <div className="text-sm text-slate-500">Date Applied</div>
              <div className="mt-1 font-semibold">{date}</div>
            </div>

            <div className="sm:col-span-2">
              <div className="text-sm text-slate-500">Notes</div>
              <div className="mt-1 whitespace-pre-wrap">{job.notes || <span className="text-slate-400">—</span>}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}