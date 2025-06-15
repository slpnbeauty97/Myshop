import express from "express";
import axios from "axios"; // if you use it
const router = express.Router();

router.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;
  
  try {
    // Call MPESA API here (Daraja, etc)
    res.json({ message: "Payment initiated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

export default router;
