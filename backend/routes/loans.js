const express = require("express");
const router = express.Router();

const loans = require("../data/loans");

// APPLY LOAN
router.post("/apply", (req, res) => {
  const { applicant, amount, purpose, tenure } = req.body;

  if (!applicant || !amount || !purpose || !tenure) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (amount < 5000 || amount > 5000000) {
    return res.status(400).json({ error: "Amount must be between 5000 and 5000000" });
  }

  if (tenure < 3 || tenure > 60) {
    return res.status(400).json({ error: "Tenure must be between 3 and 60 months" });
  }

  const newLoan = {
    id: Date.now(),
    applicant,
    amount,
    purpose,
    tenure,
    status: "pending"
  };

  loans.push(newLoan);

  res.status(201).json(newLoan);
});

// GET ALL LOANS
router.get("/", (req, res) => {
  res.json(loans);
});

// UPDATE STATUS
router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const loan = loans.find(l => l.id == id);

  if (!loan) {
    return res.status(404).json({ error: "Loan not found" });
  }

  if (status !== "approved" && status !== "rejected") {
    return res.status(400).json({ error: "Invalid status" });
  }

  loan.status = status;

  res.json({ message: "Status updated", loan });
});

// EMI CALCULATOR (VERY IMPORTANT)
router.get("/emi-calculator", (req, res) => {
  const { principal, annualRate, months } = req.query;

  if (!principal || !annualRate || !months) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  const P = parseFloat(principal);
  const r = parseFloat(annualRate) / 100 / 12;
  const n = parseInt(months);

  if (P <= 0 || r <= 0 || n <= 0) {
    return res.status(400).json({ error: "Invalid values" });
  }

  const emi =
    (P * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const totalPayable = emi * n;
  const totalInterest = totalPayable - P;

  res.json({
    emi: Number(emi.toFixed(2)),
    totalPayable: Number(totalPayable.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2))
  });
});

module.exports = router;