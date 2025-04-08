const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) throw err;
            callback(results[0]);
        });
    }
};

module.exports = User;
