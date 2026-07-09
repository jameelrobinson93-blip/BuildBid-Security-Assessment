const db = require("../database/database");

function logEvent(email, status, ip, callback) {

  db.run(
    `
    INSERT INTO security_logs
    (email, status, ip_address)
    VALUES (?, ?, ?)
    `,
    [email, status, ip],
    function (err) {

      if (err) {
        console.log("❌ SECURITY LOG ERROR");
        console.log(err);
      } else {
        console.log("✅ Security event saved:", status, email);
      }

      if (callback) {
        callback(err);
      }

    }
  );

}

function getLogs(callback) {

  db.all(
    `
    SELECT *
    FROM security_logs
    ORDER BY event_time DESC
    `,
    [],
    callback
  );

}

module.exports = {
  logEvent,
  getLogs
};
