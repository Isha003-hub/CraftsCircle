const express = require('express');
const User = require('../models/User'); 
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const role = req.query.role;
    const users = role ? await User.find({ role }) : await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (existingUser.role === 'admin') {
      return res.status(403).json({ error: 'Cannot update admin accounts' });
    }

    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (existingUser.role === 'admin') {
      return res.status(403).json({ error: 'Cannot delete admin accounts' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
