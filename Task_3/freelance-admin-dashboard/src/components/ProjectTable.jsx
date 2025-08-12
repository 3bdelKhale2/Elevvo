import React, { useMemo, useState } from 'react';
import { formatDate } from '../utils';

const statusClass = (status) => {
    switch (status) {
        case 'Completed':
            return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200';
        case 'In Progress':
            return 'bg-amber-100 text-amber-700 ring-1 ring-amber-200';
        case 'On Hold':
            return 'bg-rose-100 text-rose-700 ring-1 ring-rose-200';
        default:
            return 'bg-gray-100 text-gray-700 ring-1 ring-gray-200';
    }
};

const headers = [
    { key: 'name', label: 'Project Name' },
    { key: 'status', label: 'Status' },
    { key: 'deadline', label: 'Deadline' },
];

const ProjectTable = ({ projects = [] }) => {
    const [sort, setSort] = useState({ key: 'deadline', dir: 'asc' });

    const sorted = useMemo(() => {
        const arr = [...projects];
        arr.sort((a, b) => {
            const { key, dir } = sort;
            let av = a[key], bv = b[key];
            if (key === 'deadline') {
                av = new Date(a.deadline).getTime();
                bv = new Date(b.deadline).getTime();
            } else {
                av = String(av).toLowerCase();
                bv = String(bv).toLowerCase();
            }
            if (av < bv) return dir === 'asc' ? -1 : 1;
            if (av > bv) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return arr;
    }, [projects, sort]);

    const toggleSort = (key) => {
        setSort((s) => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                    <tr className="w-full bg-gray-50 text-gray-700 uppercase text-xs tracking-wide">
                        {headers.map(h => (
                            <th
                                key={h.key}
                                className="py-3 px-6 text-left cursor-pointer select-none"
                                onClick={() => toggleSort(h.key)}
                                title="Click to sort"
                            >
                                <div className="flex items-center gap-2">
                                    <span>{h.label}</span>
                                    <span className="text-gray-400">
                                        {sort.key === h.key ? (sort.dir === 'asc' ? '▲' : '▼') : '⇅'}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-700 text-sm">
                    {sorted.map((project) => (
                        <tr key={project.id ?? project.name} className="border-t border-gray-200 hover:bg-gray-50 transition">
                            <td className="py-3 px-6">{project.name}</td>
                            <td className="py-3 px-6">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusClass(project.status)}`}>
                                    {project.status}
                                </span>
                            </td>
                            <td className="py-3 px-6">{formatDate(project.deadline)}</td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan="3" className="py-6 px-6 text-center text-gray-500">No projects</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectTable;