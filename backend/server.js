const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const walletRoutes = require("./routes/wallet");
const transactionRoutes = require("./routes/transactions");
const loanRoutes = require("./routes/loans");
const emiRoutes = require("./routes/emi"); // ADD THIS FILE

app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/emi", emiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is working" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});