import express from 'express';
import User from '../models/User';
import Category from '../models/Category';

const router = express.Router();

router.post('http://localhost:5000/api/Signup', async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await findOne({ username });
  if (existingUser) return res.status(400).json({ msg: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await create({ username, password: hashedPassword, role });
  res.status(201).json({ msg: 'User created' });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const token = generateToken(user);
  res.json({ token, user: { username: user.username, role: user.role } });
});


router.get('/categories', async (req, res) => {
  const cats = await Category.find();
  res.json(cats.map(c => c.name));
});

router.post('/categories', async (req, res) => {
  const { category } = req.body;
  const existing = await Category.findOne({ name: category });
  if (existing) return res.status(400).json({ msg: 'Category already exists' });

  await Category.create({ name: category });
  res.status(201).json({ msg: 'Category added' });
});


export default router;