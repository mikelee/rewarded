const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get requirements
router.post('/get', (req, res) => {
    const { userId } = req.body;

    connection.query('SELECT * FROM todos t INNER JOIN requirements q ON t.todo_id = q.todo_id WHERE t.owner_id = ? ORDER BY t.completed', [userId], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create or Delete requirement
router.post('/toggle', (req, res) => {
    const { todoId, rewardId, selected } = req.body;

    if (selected) {
        connection.query('DELETE FROM requirements WHERE reward_id = ? AND todo_id = ?', [rewardId, todoId], (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        });
    } else {
        connection.query('INSERT INTO requirements (reward_id, todo_id) VALUES (?, ?)', [rewardId, todoId], (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        });
    }
});

// Delete requirement
router.delete('/delete', (req, res) => {
    const { reward_id, todo_id } = req.body;

    connection.query('DELETE FROM requirements WHERE reward_id = ? AND todo_id = ?', [reward_id, todo_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;