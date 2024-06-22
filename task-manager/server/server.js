// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

let tasks = [];
let id = 1;

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = { id: id++, title, description, dueDate };
    tasks.push(task);
    res.status(201).json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
