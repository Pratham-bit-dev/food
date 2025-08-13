import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username || form.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }
    
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/signup', form);
      alert(`Signup successful! ${response.data.msg}`);
      setForm({ username: '', password: '', role: 'user' });
      setErrors({});
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto', background: theme.background, color: theme.text }}>
      <h2>Signup</h2>
      <div>
        <input
          placeholder="Username"
          value={form.username}
          style={{ 
            background: theme.buttonBg, 
            color: theme.buttonText,
            border: errors.username ? '2px solid red' : '1px solid #ccc',
            padding: '8px',
            margin: '5px 0',
            width: '100%'
          }}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        {errors.username && <div style={{ color: 'red', fontSize: '12px' }}>{errors.username}</div>}
      </div>
      
      <div>
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          style={{ 
            background: theme.buttonBg, 
            color: theme.buttonText,
            border: errors.password ? '2px solid red' : '1px solid #ccc',
            padding: '8px',
            margin: '5px 0',
            width: '100%'
          }}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <div style={{ color: 'red', fontSize: '12px' }}>{errors.password}</div>}
      </div>
      
      {/* Removed admin role option for security - only users can sign up publicly */}
      <input type="hidden" value="user" />
      
      <button 
        onClick={handleSignup} 
        disabled={loading}
        style={{ 
          background: loading ? '#ccc' : theme.buttonBg, 
          color: theme.buttonText,
          padding: '10px 20px',
          margin: '10px 0',
          width: '100%',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>
      
      <p style={{ fontSize: '12px', color: theme.text }}>
        Note: All new accounts are created with user privileges. Contact an administrator for admin access.
      </p>
      
      <button onClick={toggleTheme} style={{ marginTop: 10 }}>Switch Theme</button>
    </div>
  );
};

export default Signup;
