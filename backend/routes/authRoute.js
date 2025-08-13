import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Category from '../models/Category.js';
import { generateToken, authMiddleware } from '../utils/auth.js';

const router = express.Router();

// Input validation helper
const validateInput = (username, password) => {
  if (!username || !password) {
    return { valid: false, message: 'Username and password are required' };
  }
  if (username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters long' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  // Basic password strength check
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' };
  }
  return { valid: true };
};

router.post('/signup', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Input validation
    const validation = validateInput(username, password);
    if (!validation.valid) {
      return res.status(400).json({ msg: validation.message });
    }

    // Security: Prevent admin role creation through public signup
    // Only allow 'user' role for public signups
    const userRole = role === 'admin' ? 'user' : (role || 'user');
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security
    const user = await User.create({ username, password: hashedPassword, role: userRole });
    res.status(201).json({ msg: 'User created successfully', role: userRole });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Admin-only route to create admin users
router.post('/create-admin', authMiddleware(['admin']), async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const validation = validateInput(username, password);
    if (!validation.valid) {
      return res.status(400).json({ msg: validation.message });
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword, role: 'admin' });
    res.status(201).json({ msg: 'Admin user created successfully' });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }
    
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats.map(c => c.name));
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.post('/categories', authMiddleware(['admin']), async (req, res) => {
  try {
    const { category } = req.body;
    
    if (!category || category.trim().length === 0) {
      return res.status(400).json({ msg: 'Category name is required' });
    }
    
    const trimmedCategory = category.trim();
    const existing = await Category.findOne({ name: trimmedCategory });
    if (existing) return res.status(400).json({ msg: 'Category already exists' });

    await Category.create({ name: trimmedCategory });
    res.status(201).json({ msg: 'Category added' });
  } catch (error) {
    console.error('Category creation error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export default router;