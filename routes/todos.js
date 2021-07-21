const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get todos
router.post('/get', (req, res) => {
    const { user_id } = req.body;

    connection.query('SELECT todo_id, text, completed FROM todos WHERE user_id = ? ORDER BY completed', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create todo
router.post('/create', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO todos (user_id) VALUES (?)', [user_id], (err, result) => {
        res.json(result);
    });
});

// Update todo
router.put('/update', (req, res) => {
    const { id, text } = req.body;

    connection.query('UPDATE todos SET text = ? WHERE todo_id = ?', [text, id], (err, result) => {
        res.json(result);
    });
});

// Toggle todo Completed
router.post('/complete', (req, res) => {
    const { id } = req.body;

    connection.query('UPDATE todos SET completed = NOT completed WHERE todo_id = ?', [id], (err, result) => {
        res.json(result);
    });
});

// Delete todo
router.delete('/delete', (req, res) => {
    const { id } = req.body;

    connection.query('DELETE FROM todos WHERE todo_id = ?; DELETE FROM requirements WHERE todo_id = ?', [id ,id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;