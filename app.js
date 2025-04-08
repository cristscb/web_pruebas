// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');
const adminRoutes = require('./routes/admin.routes');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/tasks', taskRoutes); // Ruta de tareas correctamente asignada
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.render('index');   
});


app.listen(3000, () => console.log('Server running on port 3000'));
// In this case, the /tasks route is correctly assigned to the taskRoutes module. The /admin route is assigned to the adminRoutes module. This way, the code is more organized and easier to maintain.
