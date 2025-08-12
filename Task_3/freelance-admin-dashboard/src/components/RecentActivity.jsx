import React, { useEffect, useState } from 'react';
import mock from '../assets/data/mockActivity.json';
import { formatDate } from '../utils';

const RecentActivity = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const list = Array.isArray(mock.activities) ? mock.activities : [];
        setActivities(list);
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
                {activities.map((activity) => (
                    <li key={activity.id} className="border-b pb-2">
                        <span className="font-medium">{activity.description}</span>
                        <p className="text-gray-600">{formatDate(activity.timestamp)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;