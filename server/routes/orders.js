// server/routes/orders.js
const express = require('express');
const router = express.Router();
const { Order } = require('../models');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const order = await Order.create({ phone, amount });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Invalid order data' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
