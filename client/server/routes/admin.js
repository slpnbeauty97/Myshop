// server/routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/orders', (req, res) => {
  res.send('Admin route coming soon');
});

module.exports = router;
