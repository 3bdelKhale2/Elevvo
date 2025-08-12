import React, { useState, useEffect } from 'react';
import mock from '../assets/data/mockActivity.json';

const NotificationDropdown = () => {
    const [open, setOpen] = useState(false);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const list = Array.isArray(mock.activities) ? mock.activities : [];
        setActivities(list.slice(0, 3));
    }, []);

    return (
        <div className="relative">
            <button
                className="flex items-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setOpen(o => !o)}
            >
                Notifications
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1 max-h-72 overflow-auto">
                        {activities.length > 0 ? (
                            activities.map((a) => (
                                <div key={a.id} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <div className="font-medium">{a.description}</div>
                                    <div className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">No recent activities</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;