// routes/tasks.routes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Mostrar las tareas del usuario regular
router.get('/', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;

    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    db.query(query, [userId], (err, tasks) => {
        if (err) throw err;
        res.render('tasks/index', { tasks });
    });
});

// Ruta POST para actualizar el estado de la tarea
router.post('/update-status', isAuthenticated, (req, res) => {
    const taskId = req.body.taskId;
    
    const query = 'UPDATE tasks SET status = "realizada" WHERE id = ?';
    db.query(query, [taskId], (err) => {
        if (err) throw err;
        res.redirect('/tasks');
    });
});

module.exports = router;

