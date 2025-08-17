import { useNavigate } from 'react-router-dom'
import { useJobs } from '../state/JobsContext.jsx'
import JobForm from '../components/JobForm.jsx'

export default function AddJob() {
  const { add } = useJobs()
  const navigate = useNavigate()

  function handleSubmit(values) {
    const id = add(values)
    navigate(`/job/${id}`)
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl sm:text-2xl font-semibold">Add Job</h1>
      <JobForm onSubmit={handleSubmit} submitLabel="Add Job" />
    </section>
  )
}