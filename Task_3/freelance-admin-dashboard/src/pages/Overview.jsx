import React from 'react';
import StatCard from '../components/StatCard';
import RecentActivity from '../components/RecentActivity';
import EarningsBarChart from '../components/charts/EarningsBarChart';
import TasksPieChart from '../components/charts/TasksPieChart';
import stats from '../assets/data/mockStats.json';
import projectsData from '../assets/data/mockProjects.json';
import { formatCurrency } from '../utils';

const Overview = () => {
    const totalProjects = stats?.summary?.totalProjects ?? (projectsData?.projects?.length || 0);
    const earnings = stats?.summary?.earnings ?? 0;
    const tasksDue = stats?.summary?.tasksDue ?? 0;

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    title="Total Projects"
                    value={totalProjects}
                    color="purple"
                    delta={8}
                    deltaLabel="vs last month"
                    icon={<span aria-hidden>📁</span>}
                />
                <StatCard
                    title="Earnings"
                    value={formatCurrency(earnings)}
                    color="emerald"
                    delta={12.4}
                    deltaLabel="this month"
                    icon={<span aria-hidden>💰</span>}
                />
                <StatCard
                    title="Tasks Due"
                    value={tasksDue}
                    color="amber"
                    delta={-5.3}
                    deltaLabel="week over week"
                    icon={<span aria-hidden>🗓️</span>}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Earnings Overview</h2>
                    <EarningsBarChart />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Task Distribution</h2>
                    <TasksPieChart />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                <RecentActivity />
            </div>
        </div>
    );
};

export default Overview;