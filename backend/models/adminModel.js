const db = require("../database/database");

/* ===========================
   DASHBOARD COUNTS
=========================== */

function getDashboardCounts(callback) {

    const sql = `
    SELECT

        (SELECT COUNT(*) FROM users) AS users,

        (SELECT COUNT(*) FROM contractors) AS contractors,

        (SELECT COUNT(*) FROM estimates) AS estimates,

        (SELECT COUNT(*) FROM reviews) AS reviews,

        (SELECT COUNT(*) FROM security_logs
            WHERE status='SUCCESS') AS successfulLogins,

        (SELECT COUNT(*) FROM security_logs
            WHERE status='FAILED') AS failedLogins,

        (SELECT COUNT(*) FROM users
            WHERE locked_until > strftime('%s','now') * 1000)
            AS lockedAccounts
    `;

    db.get(sql, [], callback);

}

/* ===========================
   RECENT SECURITY EVENTS
=========================== */

function getRecentSecurityEvents(callback){

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

        callback

    );

}

module.exports = {

    getDashboardCounts,

    getRecentSecurityEvents

};