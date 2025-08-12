import React from 'react';
import { Link } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

const Header = ({ onMenuToggle }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-20">
            <div className="flex items-center gap-3">
                <button
                    className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50"
                    onClick={onMenuToggle}
                    aria-label="Toggle sidebar"
                >
                    ☰
                </button>
                <div className="text-xl font-bold">Freelance Dashboard</div>
            </div>

            <div className="hidden md:flex items-center gap-6">
                <nav className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-blue-600">Overview</Link>
                    <Link to="/projects" className="text-gray-600 hover:text-blue-600">Projects</Link>
                    <Link to="/profile-settings" className="text-gray-600 hover:text-blue-600">Profile</Link>
                </nav>
                <div className="relative">
                    <NotificationDropdown />
                </div>
            </div>

            <div className="md:hidden">
                <NotificationDropdown />
            </div>
        </header>
    );
};

export default Header;