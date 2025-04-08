const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Vista principal del administrador
router.get('/', (req, res) => {
    const queryUsers = 'SELECT * FROM users';
    const queryTasks = `
        SELECT tasks.id, tasks.name AS description, tasks.status, users.username 
        FROM tasks 
        JOIN users ON tasks.user_id = users.id`;

    db.query(queryUsers, (err, users) => {
        if (err) throw err;
        db.query(queryTasks, (err, tasks) => {
            if (err) throw err;
            res.render('admin/index', { users, tasks });
        });
    });
});

// Ruta para crear una nueva tarea
router.get('/create-task', (req, res) => {
    db.query('SELECT * FROM users WHERE role = "user"', (err, users) => {
        if (err) throw err;
        res.render('admin/createTask', { users });
    });
});

router.post('/create-task', (req, res) => {
    const { name, user_id } = req.body;
    const query = 'INSERT INTO tasks (name, user_id, status) VALUES (?, ?, "pendiente")';
    db.query(query, [name, user_id], (err) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Ruta para finalizar (eliminar) una tarea
router.get('/complete-task/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'DELETE FROM tasks WHERE id = ?';

    db.query(query, [taskId], (err) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Mostrar el formulario para crear un nuevo usuario
router.get('/create-user', (req, res) => {
    res.render('admin/create-user'); // Se debe asegurar que la vista exista
});

// Ruta para procesar el formulario de creación de usuario
router.post('/create-user', (req, res) => {
    const { username, password, role } = req.body;

    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, password, role], (err) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// Ruta para eliminar un usuario
router.get('/delete-user/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';

    db.query(query, [userId], (err) => {
        if (err) throw err;
        res.redirect('/admin');
    });
});

module.exports = router;
