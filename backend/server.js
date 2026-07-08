const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const db = require("./database/database");
const contractorRoutes = require("./routes/contractorRoutes");

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
            role TEXT
        )
    `);

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

    // SAMPLE CONTRACTORS
    db.run(`
        INSERT OR IGNORE INTO contractors
        (id, company, specialty, city, phone, rating)
        VALUES
        (1, 'Mike''s Construction', 'Kitchen Remodeling', 'Paterson', '973-555-1001', 4.9)
    `);

    db.run(`
        INSERT OR IGNORE INTO contractors
        (id, company, specialty, city, phone, rating)
        VALUES
        (2, 'Elite Roofing', 'Roof Repair', 'Clifton', '973-555-2002', 4.8)
    `);

    db.run(`
        INSERT OR IGNORE INTO contractors
        (id, company, specialty, city, phone, rating)
        VALUES
        (3, 'Garden State Plumbing', 'Plumbing', 'Newark', '973-555-3003', 5.0)
    `);

});

/* ===========================
   SECURITY
=========================== */

// Remove Express fingerprint
app.disable("x-powered-by");

// Security Headers
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        error: "Too many requests. Please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

app.use(limiter);

// Restrict CORS to your React app
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true
}));

// Parse JSON
app.use(express.json());

/* ===========================
   ROUTES
=========================== */

app.use("/api/contractors", contractorRoutes);

// Home Route
app.get("/", (req, res) => {
    res.json({
        project: "BuildBid",
        status: "API Running",
        version: "1.0"
    });
});

// Database Test Route
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
   SERVER
=========================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ BuildBid Server running on http://localhost:${PORT}`);
});