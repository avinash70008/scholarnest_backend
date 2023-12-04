const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'avinashassignments', { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const user = new User({ firstName, lastName, email, phone, password });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ token ,user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.editProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    const userId = req.userId; 
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, phone }, { new: true });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};