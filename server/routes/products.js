// server/routes/products.js
const express = require('express');
const router = express.Router();
const { Product } = require('../models');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { name, price, image, stock } = req.body;
    const product = await Product.create({ name, price, image, stock });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product data' });
  }
});

module.exports = router;
