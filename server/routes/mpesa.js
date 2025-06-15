// routes/mpesa.js
import express from 'express';
const router = express.Router();

router.post('/stkpush', async (req, res) => {
  try {
    const { phone, amount, accountNumber } = req.body;
    // Simulate or integrate with real STK push here
    console.log(`STK Push to ${phone} for ${amount} KES. Account: ${accountNumber}`);
    res.status(200).json({ success: true, message: 'STK push initiated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'STK push failed', error });
  }
});

export default router;
