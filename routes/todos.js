const express = require('express');
const router = express.Router();
const connection = require('../db');
const { isTodoOwner } = require('../middleware');

// Get todos
router.get('/', (req, res) => {
    const { user_id } = req.user;

    connection.query('SELECT todo_id AS todoId, text, completed FROM todos WHERE user_id = ? ORDER BY completed, todo_id desc', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create todo
router.post('/create', (req, res) => {
    const { user_id } = req.user;

    connection.query('INSERT INTO todos (user_id) VALUES (?)', [user_id], (err, result) => {
        res.json(result);
    });
});

// Update todo
router.put('/update', isTodoOwner, (req, res) => {
    const { todo_id, text } = req.body;

    connection.query('UPDATE todos SET text = ? WHERE todo_id = ?', [text, todo_id], (err, result) => {
        res.json(result);
    });
});

// Toggle todo Completed
router.post('/complete', isTodoOwner, (req, res) => {
    const { todo_id } = req.body;

    connection.query('UPDATE todos SET completed = NOT completed WHERE todo_id = ?', [todo_id], (err, result) => {
        res.json(result);
    });
});

// Delete todo
router.delete('/delete', isTodoOwner, (req, res) => {
    const { todo_id } = req.body;

    connection.query('DELETE FROM todos WHERE todo_id = ?; DELETE FROM requirements WHERE todo_id = ?', [todo_id, todo_id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;