// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    trim: true,
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: { 
    type: String, 
    enum: {
      values: ['user', 'admin'],
      message: 'Role must be either user or admin'
    }, 
    default: 'user' 
  },
}, {
  timestamps: true // Add createdAt and updatedAt fields
});

// Index for better query performance
UserSchema.index({ username: 1 });

export default mongoose.model('User', UserSchema);
