import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data));
  }, []);

  const submitCategory = () => {
    const token = localStorage.getItem("token");
    if (selected === 'Other' && newCategory) {
      axios.post('http://localhost:5000/api/categories', { category: newCategory }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => {
        alert('New category added');
        setCategories([...categories, newCategory]);
      });
    } else {
      alert(`Using category: ${selected}`);
    }
  };

  return (
    <div>
      <select
        style={{ background: theme.buttonBg, color: theme.buttonText }}
        onChange={e => setSelected(e.target.value)}
      >
        <option>Select a category</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        <option value="Other">Other</option>
      </select>
      {selected === 'Other' && (
        <input
          placeholder="New category"
          style={{ background: theme.buttonBg, color: theme.buttonText }}
          onChange={e => setNewCategory(e.target.value)}
        />
      )}
      <button
        style={{ background: theme.buttonBg, color: theme.buttonText }}
        onClick={submitCategory}
      >
        Submit
      </button>
    </div>
  );
};

export default CategoryForm;
