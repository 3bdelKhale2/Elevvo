import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ className = '' }) => {
    const base = "block p-3 rounded-md transition";
    const inactive = "text-gray-200 hover:bg-gray-700 hover:text-white";
    const active = "bg-gray-900 text-white";

    return (
        <div className={`bg-gray-800 text-white w-64 h-full p-4 ${className}`}>
            <div className="px-2">
                <h2 className="text-lg font-bold">Admin Dashboard</h2>
            </div>
            <nav className="mt-5 space-y-1 px-2">
                <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>Overview</NavLink>
                <NavLink to="/projects" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>Projects</NavLink>
                <NavLink to="/profile-settings" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>Profile Settings</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;