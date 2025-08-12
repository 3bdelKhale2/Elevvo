# Freelance Admin Dashboard

## Overview
The Freelance Admin Dashboard is a professional, responsive, and interactive web application built using ReactJS, React Router, Chart.js (or Recharts), and TailwindCSS. This dashboard provides an intuitive user experience for freelance clients to manage their projects, view statistics, and track recent activities.

## Features
- **Overview Page**: Displays summary statistic cards (Total Projects, Earnings, Tasks Due), a Recent Activity list, and basic stats such as total clients and ongoing projects.
- **Projects Page**: Shows a table or card grid of client projects, including project name, status, and deadline.
- **Profile Settings Page**: Allows users to view and edit their profile details (name, email, password).

## Technologies Used
- **ReactJS**: For building the user interface.
- **React Router**: For seamless navigation between pages.
- **Chart.js / Recharts**: For data visualization.
- **TailwindCSS**: For styling and responsive design.

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/freelance-admin-dashboard.git
   ```
2. Navigate to the project directory:
   ```
   cd freelance-admin-dashboard
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure
```
freelance-admin-dashboard
├── public
│   └── index.html
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── assets
│   │   └── data
│   │       └── mockActivity.json
│   ├── components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── NotificationDropdown.jsx
│   │   ├── StatCard.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── ProjectTable.jsx
│   │   └── charts
│   │       ├── EarningsBarChart.jsx
│   │       └── TasksPieChart.jsx
│   ├── layout
│   │   └── DashboardLayout.jsx
│   ├── pages
│   │   ├── Overview.jsx
│   │   ├── Projects.jsx
│   │   └── ProfileSettings.jsx
│   ├── routes
│   │   └── index.jsx
│   └── utils
│       └── index.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Contributing
Feel free to submit issues or pull requests for any improvements or features you would like to see.

## License
This project is licensed under the MIT License.