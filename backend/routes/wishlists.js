const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// GET wishlist
router.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(wishlist || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});


router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body; 
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.params.userId },
      { items },
      { upsert: true, new: true }
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update wishlist' });
  }
});

module.exports = router;
