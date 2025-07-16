require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const registration = require("./route/auth/auth");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const queryRoute = require("./route/query/query");

app.use(cors());
app.use(express.json());

// Global error handling middleware for uncaught errors
app.use((err, req, res, next) => {
  console.error("Unhandled error in request:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// routes

app.use("/api/auth", registration);
app.use("/api/query", queryRoute);

// Test endpoint
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "It is running" });
  } catch (err) {
    console.error("Error in GET / endpoint:", err);
    res.status(500).json({ message: "Error in test endpoint" });
  }
});

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Connect to MongoDB
mongoose
  .connect(process.env.DATACONNECTION)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("Error connecting to DB:", err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
