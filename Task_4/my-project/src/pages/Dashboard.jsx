import { Link } from 'react-router-dom'
import { useJobs } from '../state/JobsContext.jsx'
import JobListItem from '../components/JobListItem.jsx'

export default function Dashboard() {
  const { jobs } = useJobs()

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Track your applications and stay organized.</p>
        </div>
        <Link className="btn btn-primary hover-lift hidden sm:inline-flex" to="/add">Add Job</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card p-8 text-center animate-appear">
          <p className="mb-4 text-slate-600">No applications yet.</p>
          <Link className="btn btn-primary hover-lift" to="/add">Add your first job</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 animate-appear">
          {jobs.map(job => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  )
}