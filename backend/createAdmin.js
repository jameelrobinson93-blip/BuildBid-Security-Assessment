const bcrypt = require("bcrypt");
const db = require("./database/database");

async function createAdmin() {
  const email = "admin@buildbid.com";
  const password = "BuildBid2026!";

  const hash = await bcrypt.hash(password, 10);

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {

      if (err) {
        console.log(err);
        process.exit();
      }

      if (user) {
        console.log("✅ Admin already exists.");
        process.exit();
      }

      db.run(
        `
        INSERT INTO users
        (first_name,last_name,email,password,role)
        VALUES
        (?,?,?,?,?)
        `,
        [
          "BuildBid",
          "Administrator",
          email,
          hash,
          "admin"
        ],
        function(err) {

          if (err) {
            console.log(err);
          } else {
            console.log("");
            console.log("================================");
            console.log("✅ ADMIN ACCOUNT CREATED");
            console.log("================================");
            console.log("Email: admin@buildbid.com");
            console.log("Password: BuildBid2026!");
            console.log("");
          }

          process.exit();

        }

      );

    }

  );

}

createAdmin();