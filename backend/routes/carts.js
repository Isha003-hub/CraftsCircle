const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();


router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
  res.json(cart || { userId: req.params.userId, items: [] });
});


router.post('/:userId', async (req, res) => {
  const { items } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.params.userId },
    { items },
    { upsert: true, new: true }
  );
  res.json(cart);
});


module.exports = router;