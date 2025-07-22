import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Login = ({ navigate }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      const { user, token } = res.data;
      localStorage.setItem('token', token);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', background: theme.background, color: theme.text }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        style={{ color: theme.buttonText, background: theme.buttonBg }}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ color: theme.buttonText, background: theme.buttonBg }}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin} style={{ background: theme.buttonBg, color: theme.buttonText }}>
        Login
      </button>
      <p>
        Don’t have an account? <a href="/signup" style={{ color: theme.link }}>Sign up</a>
      </p>
      <button onClick={toggleTheme} style={{ marginTop: 10 }}>Switch Theme</button>
    </div>
  );
};

export default Login;
