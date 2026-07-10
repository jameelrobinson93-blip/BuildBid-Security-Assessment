const db = require("../database/database");

exports.getDashboardStats = (req, res) => {

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
            "SELECT COUNT(*) AS total FROM reviews",
            [],
            (err, row) => {

              if (err) {
                return res.status(500).json(err);
              }

              stats.reviews = row.total;

              db.get(
                "SELECT COUNT(*) AS total FROM estimates",
                [],
                (err, row) => {

                  if (err) {
                    return res.status(500).json(err);
                  }

                  stats.estimates = row.total;

                  db.get(
                    `
                    SELECT COUNT(*) AS total
                    FROM security_logs
                    WHERE status='SUCCESS'
                    `,
                    [],
                    (err, row) => {

                      stats.success = row.total;

                      db.get(
                        `
                        SELECT COUNT(*) AS total
                        FROM security_logs
                        WHERE status='FAILED'
                        `,
                        [],
                        (err, row) => {

                          stats.failed = row.total;

                          db.get(
                            `
                            SELECT COUNT(*) AS total
                            FROM security_logs
                            WHERE status='LOCKED'
                            `,
                            [],
                            (err, row) => {

                              stats.locked = row.total;

                              db.get(
                                `
                                SELECT COUNT(*) AS total
                                FROM security_logs
                                WHERE status='XSS_BLOCKED'
                                `,
                                [],
                                (err, row) => {

                                  stats.xss = row.total;

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