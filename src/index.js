const express = require('express');
const PORT = 8081;
const app = express();
const authController = require('./controller/auth-controller');
const todoController = require('./controller/todo-controller');

app.get('/api', (req, res) => {
    res.send(`Ini adalah api akuh`);
})

app.use((req, res, next) => {
    console.log(`Http request ${req.method} ${req.url}`);
    next();
})
app.use(express.json());
app.use('/todo', todoController);
app.use('/auth', authController);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
})