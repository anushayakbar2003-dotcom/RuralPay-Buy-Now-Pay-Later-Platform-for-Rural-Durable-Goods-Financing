const express = require("express");
const router = express.Router();

router.post("/calculate-emi", (req, res) => {
  const { principal, rate, tenure } = req.body;

  const P = parseFloat(principal);
  const R = parseFloat(rate) / 12 / 100;
  const N = parseFloat(tenure);

  if (!P || !R || !N) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const emi =
    (P * R * Math.pow(1 + R, N)) /
    (Math.pow(1 + R, N) - 1);

  let balance = P;
  let schedule = [];

  for (let i = 1; i <= N; i++) {
    const interest = balance * R;
    const principalPaid = emi - interest;
    balance = balance - principalPaid;

    schedule.push({
      month: i,
      emi: emi.toFixed(2),
      interest: interest.toFixed(2),
      principal: principalPaid.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : "0.00",
    });
  }

  res.json({
    emi: emi.toFixed(2),
    schedule,
  });
});

module.exports = router;