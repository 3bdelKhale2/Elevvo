import React from 'react';

const StatCard = ({ title, value, icon, delta, deltaLabel, color = 'blue' }) => {
    const colorMap = {
        blue: 'from-blue-500 to-cyan-500',
        emerald: 'from-emerald-500 to-green-500',
        purple: 'from-purple-500 to-pink-500',
        amber: 'from-amber-500 to-orange-500',
    };
    const ringColor = {
        blue: 'ring-blue-200',
        emerald: 'ring-emerald-200',
        purple: 'ring-purple-200',
        amber: 'ring-amber-200',
    };

    const deltaColor = (delta ?? 0) >= 0 ? 'text-emerald-600' : 'text-rose-600';
    const deltaSign = (delta ?? 0) >= 0 ? '+' : '';

    return (
        <div className={`bg-white rounded-xl shadow-md p-4 flex items-center gap-4 ring-1 ${ringColor[color]} transition hover:shadow-lg`}>
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${colorMap[color]} text-white grid place-items-center text-2xl shrink-0`}>
                {icon}
            </div>
            <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-2xl font-semibold">{value}</p>
                    {delta != null && (
                        <span className={`text-xs font-medium ${deltaColor}`}>
                            {deltaSign}{delta}% {deltaLabel || ''}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;