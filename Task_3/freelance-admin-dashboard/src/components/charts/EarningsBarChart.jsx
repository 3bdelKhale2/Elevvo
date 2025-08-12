import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{ month: 'Jan', earnings: 4000 },
	{ month: 'Feb', earnings: 3000 },
	{ month: 'Mar', earnings: 5000 },
	{ month: 'Apr', earnings: 7000 },
	{ month: 'May', earnings: 6000 },
	{ month: 'Jun', earnings: 8000 },
	{ month: 'Jul', earnings: 9000 },
];

const EarningsBarChart = () => (
	<div className="bg-white shadow-md rounded-lg p-4">
		<div className="h-72">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="month" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="earnings" fill="#4FD1C5" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	</div>
);

export default EarningsBarChart;