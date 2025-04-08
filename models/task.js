const db = require('../config/db');

const Task = {
    getTasksByUser: (userId, callback) => {
        db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }
};

module.exports = Task;
