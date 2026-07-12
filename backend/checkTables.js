const db = require("./database/database");

console.log("Checking database...");

db.all(
  "SELECT name FROM sqlite_master WHERE type='table'",
  [],
  (err, rows) => {

    if (err) {
      console.error("Database Error:");
      console.error(err);
      process.exit(1);
    }

    console.log("\n===== TABLES =====");

    if (rows.length === 0) {
      console.log("No tables found.");
    } else {
      rows.forEach((row) => {
        console.log("- " + row.name);
      });
    }

    db.close();

  }
);