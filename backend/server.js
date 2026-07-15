require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./database/postgres");

// Routes
const authRoutes = require("./routes/authRoutes");
const contractorRoutes = require("./routes/contractorRoutes");
const securityRoutes = require("./routes/securityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const estimateRoutes = require("./routes/estimateRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");

const app = express();

/* ===========================
   SECURITY
=========================== */

app.disable("x-powered-by");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later."
  }
});

// app.use(limiter);

/* ===========================
   CORS
=========================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://buildbid-pdbp.onrender.com"
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.use(express.json());

/* ===========================
   ROUTES
=========================== */

app.use("/api/auth", authRoutes);

app.use("/api/contractors", contractorRoutes);

app.use("/api/security", securityRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/admin", adminUserRoutes);

app.use("/api/estimates", estimateRoutes);

// Contractor Dashboard API
app.use("/api/contractor", contractorRoutes);
/* ===========================
   HOME
=========================== */

app.get("/", (req, res) => {
  res.json({
    project: "BuildBid API",
    status: "Running",
    database: "PostgreSQL"
  });
});

/* ===========================
   DATABASE TEST
=========================== */

app.get("/api/postgres-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database(), current_user, NOW()"
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

/* ===========================
   START SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("");
  console.log("======================================");
  console.log("🚀 BuildBid Backend Started");
  console.log(`🌐 Running on Port ${PORT}`);
  console.log("======================================");
});