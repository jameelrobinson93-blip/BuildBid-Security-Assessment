require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const pool = require("./database/postgres");

// ===========================
// ROUTES
// ===========================

const authRoutes = require("./routes/authRoutes");
const contractorRoutes = require("./routes/contractorRoutes");
const securityRoutes = require("./routes/securityRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const estimateRoutes = require("./routes/estimateRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");

const app = express();

/* ===========================
   SECURITY
=========================== */

app.disable("x-powered-by");

app.use(helmet());

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use(limiter);

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
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

/* ===========================
   BODY PARSER
=========================== */

app.use(
  express.json({
    limit: "1mb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb"
  })
);

/* ===========================
   API ROUTES
=========================== */

app.use("/api/auth", authRoutes);

app.use("/api/contractors", contractorRoutes);

app.use("/api/contractor", contractorRoutes);

app.use("/api/estimates", estimateRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/security", securityRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/admin", adminUserRoutes);

/* ===========================
   HOME
=========================== */

app.get("/", (req, res) => {
  res.json({
    project: "BuildBid API",
    status: "Running",
    version: "2.0",
    database: "PostgreSQL"
  });
});

/* ===========================
   HEALTH CHECK
=========================== */

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

/* ===========================
   DEVELOPMENT DATABASE TEST
=========================== */

if (process.env.NODE_ENV !== "production") {
  app.get("/api/postgres-test", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          current_database(),
          current_user,
          NOW()
      `);

      res.json({
        success: true,
        database: result.rows[0]
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message
      });

    }
  });
}

/* ===========================
   404
=========================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

/* ===========================
   ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });

});

/* ===========================
   START SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("");
  console.log("========================================");
  console.log("🚀 BuildBid Backend Started");
  console.log(`🌐 Server Running on Port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("🛡 Helmet Enabled");
  console.log("📦 Compression Enabled");
  console.log("🚦 Rate Limiter Enabled");
  console.log("🗄 PostgreSQL Connected");
  console.log("========================================");
  console.log("");

});