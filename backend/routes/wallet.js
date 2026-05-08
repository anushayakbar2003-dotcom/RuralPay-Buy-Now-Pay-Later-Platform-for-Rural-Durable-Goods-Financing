const express = require("express");
const router = express.Router();

const wallet = require("../data/walletData");
const transactions = require("../data/transactions");

// GET WALLET
router.get("/", (req, res) => {
  res.json(wallet);
});

// DEPOSIT
router.post("/deposit", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount" });
  }

  wallet.balance += amount;

  transactions.unshift({
    id: Date.now(),
    type: "credit",
    amount,
    timestamp: new Date(),
    description: "Wallet Deposit"
  });

  res.json({ message: "Deposit successful", wallet });
});

// WITHDRAW
router.post("/withdraw", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid withdraw amount" });
  }

  if (amount > wallet.balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  wallet.balance -= amount;

  transactions.unshift({
    id: Date.now(),
    type: "debit",
    amount,
    timestamp: new Date(),
    description: "Wallet Withdraw"
  });

  res.json({ message: "Withdraw successful", wallet });
});

module.exports = router;