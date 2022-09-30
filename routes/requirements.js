const express = require('express');
const router = express.Router();
const connection = require('../db');
const { isRequirementOwner } = require('../middleware');

// Get requirements
router.get('/', (req, res) => {
    const { user_id } = req.user;

    connection.query('SELECT t.todo_id AS todoId, text, completed, reward_id AS rewardId FROM todos t INNER JOIN requirements q ON t.todo_id = q.todo_id WHERE t.user_id = ? ORDER BY t.completed', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create or Delete requirement
router.post('/toggle', isRequirementOwner, (req, res) => {
    const { reward_id, todo_id, selected } = req.body;

    if (selected) {
        connection.query('DELETE FROM requirements WHERE reward_id = ? AND todo_id = ?', [reward_id, todo_id], (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        });
    } else {
        connection.query('INSERT INTO requirements (reward_id, todo_id) VALUES (?, ?)', [reward_id, todo_id], (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        });
    }
});

// Delete requirement
router.delete('/delete', isRequirementOwner, (req, res) => {
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