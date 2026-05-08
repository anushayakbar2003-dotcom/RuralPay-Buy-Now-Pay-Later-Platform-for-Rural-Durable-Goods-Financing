const express = require("express");
const router = express.Router();

const transactions = require("../data/transactions");

// GET ALL TRANSACTIONS
router.get("/", (req, res) => {
  let result = transactions;

  // FILTERING (IMPORTANT REQUIREMENT)
  const { type } = req.query;

  if (type === "credit") {
    result = transactions.filter(t => t.type === "credit");
  }

  if (type === "debit") {
    result = transactions.filter(t => t.type === "debit");
  }

  res.json(result);
});

module.exports = router;