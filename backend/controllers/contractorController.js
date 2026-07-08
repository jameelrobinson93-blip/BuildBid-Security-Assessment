const db = require("../database/database");

exports.getContractors = (req, res) => {

    db.all("SELECT * FROM contractors", [], (err, rows) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(rows);

    });

};