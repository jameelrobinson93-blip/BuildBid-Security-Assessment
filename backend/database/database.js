const sqlite3 = require("sqlite3").verbose();

const path = require("path");



const db = new sqlite3.Database(

  path.join(__dirname, "buildbid.db"),

  (err) => {

    if (err) {

      console.error("❌ Database connection failed:", err.message);

    } else {

      console.log("✅ Connected to BuildBid Database");

    }

  }

);



module.exports = db;