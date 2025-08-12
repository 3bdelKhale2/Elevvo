import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Completed', value: 300 },
  { name: 'In Progress', value: 50 },
  { name: 'On Hold', value: 100 },
];

const COLORS = ['#4CAF50', '#FF9800', '#F44336'];

const TasksPieChart = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TasksPieChart;