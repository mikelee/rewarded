const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get all todos, rewards, and requirements
router.get('/api/:user_id', (req, res) => {
    const { user_id } = req.params;

    connection.query(`
        SELECT todo_id AS todoId, text, completed FROM todos WHERE user_id = ? ORDER BY completed;
        SELECT reward_id AS rewardId, text FROM rewards WHERE user_id = ?;
        SELECT q.reward_id AS rewardId, q.todo_id AS todoId, t.text as text, t.completed AS completed FROM requirements q LEFT JOIN todos t ON q.todo_id = t.todo_id WHERE t.user_id = ?;
        SELECT color_theme FROM SETTINGS WHERE user_id = ?;
    `, [user_id, user_id, user_id, user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Get requirements and todos
router.get('/api/todos-for-selection', (req, res) => {
    const { reward_id, user_id } = req.query;

    connection.query(`
        SELECT *
        FROM (
            SELECT
                t.todo_id AS todoId,
                t.text AS text,
                q.reward_id AS rewardId,
                t.completed AS completed
            FROM todos t
            LEFT JOIN requirements q
            ON t.todo_id = q.todo_id
            WHERE q.reward_id = ? AND t.user_id = ?
            GROUP BY todoId

            UNION
            
            SELECT
                t.todo_id AS todoId,
                t.text AS text,
                q.reward_id AS rewardId,
                t.completed AS completed
            FROM todos t
            LEFT JOIN requirements q
            ON t.todo_id = q.todo_id
            WHERE (q.reward_id <> ? OR q.reward_id IS NULL) AND t.user_id = ?
            GROUP BY todoId
        ) AS a
        GROUP BY todoId
        ORDER BY completed;
    `, [reward_id, user_id, reward_id, user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;