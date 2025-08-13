import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const { theme, toggleTheme } = useTheme();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/signup', form);
      alert('Signup successful');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', background: theme.background, color: theme.text }}>
      <h2>Signup</h2>
      <input
        placeholder="Username"
        style={{ background: theme.buttonBg, color: theme.buttonText }}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ background: theme.buttonBg, color: theme.buttonText }}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select
        style={{ background: theme.buttonBg, color: theme.buttonText }}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup} style={{ background: theme.buttonBg, color: theme.buttonText }}>
        Signup
      </button>
      <button onClick={toggleTheme} style={{ marginTop: 10 }}>Switch Theme</button>
    </div>
  );
};

export default Signup;
