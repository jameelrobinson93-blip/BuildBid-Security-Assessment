const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const db = require("./database/database");

// Routes
const contractorRoutes = require("./routes/contractorRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ===========================
   DATABASE SETUP
=========================== */

db.serialize(() => {

  // USERS TABLE
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,

    failed_attempts INTEGER DEFAULT 0,
    locked_until INTEGER DEFAULT 0
  )
`);

// Add brute-force protection columns for existing databases
db.run("ALTER TABLE users ADD COLUMN failed_attempts INTEGER DEFAULT 0", () => {});
db.run("ALTER TABLE users ADD COLUMN locked_until INTEGER DEFAULT 0", () => {});

  // CONTRACTORS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS contractors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT,
      specialty TEXT,
      city TEXT,
      phone TEXT,
      rating REAL
    )
  `);

  // ESTIMATES TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS estimates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      contractor_id INTEGER,
      project_type TEXT,
      description TEXT,
      budget REAL,
      status TEXT
    )
  `);

  // Sample Contractors
  db.run(`
    INSERT OR IGNORE INTO contractors
    (id, company, specialty, city, phone, rating)
    VALUES
    (1,'Mike''s Construction','Kitchen Remodeling','Paterson','973-555-1001',4.9)
  `);

  db.run(`
    INSERT OR IGNORE INTO contractors
    (id, company, specialty, city, phone, rating)
    VALUES
    (2,'Elite Roofing','Roof Repair','Clifton','973-555-2002',4.8)
  `);

  db.run(`
    INSERT OR IGNORE INTO contractors
    (id, company, specialty, city, phone, rating)
    VALUES
    (3,'Garden State Plumbing','Plumbing','Newark','973-555-3003',5.0)
  `);

});

/* ===========================
   SECURITY
=========================== */

app.disable("x-powered-by");

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later."
  }
});

app.use(limiter);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://buildbid-pdbp.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }

  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

/* ===========================
   ROUTES
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/contractors", contractorRoutes);

/* ===========================
   HOME
=========================== */

app.get("/", (req, res) => {

  res.json({
    project: "BuildBid",
    status: "API Running",
    version: "1.0"
  });

});

/* ===========================
   DATABASE TEST
=========================== */

app.get("/api/test", (req, res) => {

  db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});

/* ===========================
   TEMPORARY USERS ROUTE
=========================== */

app.get("/api/users", (req, res) => {

  db.all(
    "SELECT id, first_name, last_name, email, role FROM users",
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

});

/* ===========================
   START SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`✅ BuildBid Server running on http://localhost:${PORT}`);

});