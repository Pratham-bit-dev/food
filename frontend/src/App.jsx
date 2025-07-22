// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const User = { name: 'User' };

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login navigate={(p) => window.location.href = p} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<div>Welcome {User.name}</div>} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
