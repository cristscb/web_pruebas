const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, (user) => {
        if (user && user.password === password) {
            req.session.user = user;
            res.redirect(user.role === 'admin' ? '/admin' : '/tasks');
        } else {
            res.send('Usuario o contraseña incorrectos');
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
