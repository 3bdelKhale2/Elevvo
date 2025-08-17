import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'jobApplications:v1'
export const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected']

const JobsContext = createContext(null)

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    return []
  }
}

function saveToStorage(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      return [action.payload, ...state]
    }
    case 'UPDATE': {
      const { id, updates } = action.payload
      return state.map(j => (j.id === id ? { ...j, ...updates } : j))
    }
    case 'DELETE': {
      const id = action.payload
      return state.filter(j => j.id !== id)
    }
    case 'IMPORT': {
      const { jobs: incoming, overwriteMatches } = action.payload
      const map = new Map(state.map(j => [j.id, j]))
      for (const ji of incoming) {
        const id = ji.id ?? crypto.randomUUID()
        if (map.has(id)) {
          if (overwriteMatches) {
            map.set(id, { ...map.get(id), ...ji, id })
          }
        } else {
          map.set(id, { ...ji, id })
        }
      }
      return Array.from(map.values()).sort((a, b) => (b.dateApplied || '').localeCompare(a.dateApplied || ''))
    }
    case 'CLEAR': {
      return []
    }
    default:
      return state
  }
}

export function JobsProvider({ children }) {
  const [jobs, dispatch] = useReducer(reducer, [], loadFromStorage)

  useEffect(() => {
    saveToStorage(jobs)
  }, [jobs])

  const actions = useMemo(
    () => ({
      add(job) {
        const payload = {
          id: crypto.randomUUID(),
          company: job.company.trim(),
          title: job.title.trim(),
          status: STATUSES.includes(job.status) ? job.status : 'Applied',
          dateApplied: job.dateApplied || new Date().toISOString().slice(0, 10),
          notes: job.notes?.trim() || ''
        }
        dispatch({ type: 'ADD', payload })
        return payload.id
      },
      update(id, updates) {
        dispatch({ type: 'UPDATE', payload: { id, updates } })
      },
      remove(id) {
        dispatch({ type: 'DELETE', payload: id })
      },
      importJobs(jobs, overwriteMatches) {
        dispatch({ type: 'IMPORT', payload: { jobs, overwriteMatches } })
      },
      clearAll() {
        dispatch({ type: 'CLEAR' })
      }
    }),
    []
  )

  const value = useMemo(() => ({ jobs, ...actions }), [jobs, actions])

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
}

export function useJobs() {
  const ctx = useContext(JobsContext)
  if (!ctx) throw new Error('useJobs must be used within JobsProvider')
  return ctx
}