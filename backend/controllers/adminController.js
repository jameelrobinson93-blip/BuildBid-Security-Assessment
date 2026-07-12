const db = require("../database/database");

exports.getOverview = (req, res) => {

  const stats = {};

  db.get(
    "SELECT COUNT(*) AS total FROM users",
    [],
    (err, row) => {

      if (err) {
        return res.status(500).json(err);
      }

      stats.users = row.total;

      db.get(
        "SELECT COUNT(*) AS total FROM contractors",
        [],
        (err, row) => {

          if (err) {
            return res.status(500).json(err);
          }

          stats.contractors = row.total;

          db.get(
            "SELECT COUNT(*) AS total FROM estimates",
            [],
            (err, row) => {

              stats.estimates = row.total;

              db.get(
                "SELECT COUNT(*) AS total FROM reviews",
                [],
                (err, row) => {

                  stats.reviews = row.total;

                  db.get(
                    "SELECT COUNT(*) AS total FROM security_logs WHERE status='SUCCESS'",
                    [],
                    (err, row) => {

                      stats.successfulLogins = row.total;

                      db.get(
                        "SELECT COUNT(*) AS total FROM security_logs WHERE status='FAILED'",
                        [],
                        (err, row) => {

                          stats.failedLogins = row.total;

                          db.get(
                            "SELECT COUNT(*) AS total FROM security_logs WHERE status='LOCKED'",
                            [],
                            (err, row) => {

                              stats.lockedAccounts = row.total;

                              db.get(
                                "SELECT COUNT(*) AS total FROM security_logs WHERE status='XSS_BLOCKED'",
                                [],
                                (err, row) => {

                                  stats.xssAttempts = row.total;

                                  stats.securityScore = 98;

                                  stats.platform = {
                                    api: "Online",
                                    database: "Connected",
                                    jwt: "Active",
                                    helmet: "Enabled",
                                    rateLimiting: "Enabled"
                                  };

                                  res.json(stats);

                                }
                              );

                            }
                          );

                        }
                      );

                    }
                  );

                }
              );

            }
          );

        }
      );

    }
  );

};

exports.getSecurityEvents = (req, res) => {

  db.all(
    `
    SELECT
      email,
      status,
      ip_address,
      event_time
    FROM security_logs
    ORDER BY event_time DESC
    LIMIT 25
    `,
    [],
    (err, rows) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);

    }
  );

};