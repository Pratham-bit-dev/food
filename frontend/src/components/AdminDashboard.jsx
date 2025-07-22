import React from 'react';
import { useTheme } from '../context/ThemeContext';
import CategoryForm from './CategoryForm';

const AdminDashboard = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '40px', background: theme.background, color: theme.text, minHeight: '100vh' }}>
      <h2>Admin Dashboard</h2>
      <CategoryForm />
      <button onClick={toggleTheme} style={{ marginTop: 20 }}>Switch Theme</button>
    </div>
  );
};

export default AdminDashboard;
