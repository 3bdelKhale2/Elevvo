import React, { useMemo, useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import data from '../assets/data/mockProjects.json';

const Projects = () => {
    const all = Array.isArray(data?.projects) ? data.projects : [];
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('All');

    const filtered = useMemo(() => {
        return all
            .filter(p => (status === 'All' ? true : p.status === status))
            .filter(p => p.name.toLowerCase().includes(query.trim().toLowerCase()));
    }, [all, query, status]);

    const counts = useMemo(() => {
        const c = { All: all.length, Completed: 0, 'In Progress': 0, 'On Hold': 0 };
        all.forEach(p => { c[p.status] = (c[p.status] || 0) + 1; });
        return c;
    }, [all]);

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">Client Projects</h1>

            <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex gap-2">
                    {['All', 'Completed', 'In Progress', 'On Hold'].map(s => (
                        <button
                            key={s}
                            onClick={() => setStatus(s)}
                            className={`px-3 py-1.5 rounded-full text-sm border transition ${status === s
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            {s} ({counts[s] ?? 0})
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search projects..."
                        className="w-full md:w-72 border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔎</span>
                </div>
            </div>

            <ProjectTable projects={filtered} />
        </div>
    );
};

export default Projects;