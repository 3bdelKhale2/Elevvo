import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddJob from './pages/AddJob.jsx'
import JobDetails from './pages/JobDetails.jsx'

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Decorative blurred blobs */}
      <div className="bg-decor fixed inset-0 -z-10">
        <span className="b1"></span>
        <span className="b2"></span>
        <span className="b3"></span>
      </div>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container w-full py-6 space-y-2 animate-appear">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddJob />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="container py-8 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <span>Job Tracker — a simple, private job application tracker.</span>
            <nav className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Contact</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  )
}