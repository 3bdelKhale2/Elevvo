import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Overview from './pages/Overview';
import Projects from './pages/Projects';
import ProfileSettings from './pages/ProfileSettings';

const App = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;