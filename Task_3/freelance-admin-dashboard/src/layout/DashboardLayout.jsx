import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Mobile overlay */}
            <div className={`${open ? 'fixed' : 'hidden'} inset-0 z-30 bg-black/40 md:hidden`} onClick={() => setOpen(false)} />

            {/* Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed z-40 md:hidden h-full transition-transform`}>
                <Sidebar className="shadow-lg" />
            </div>

            {/* Main */}
            <div className="flex-1 flex flex-col">
                <Header onMenuToggle={() => setOpen(v => !v)} />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;