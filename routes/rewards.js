const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get rewards
router.post('/get', (req, res) => {
    const { user_id } = req.body;

    connection.query('SELECT * FROM rewards WHERE user_id = ?', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create reward
router.post('/create', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO rewards (user_id) VALUES (?)', [user_id], (err, result) => {
        res.json(result);
    });
});

// Update reward
router.put('/update', (req, res) => {
    const { id, text } = req.body;

    connection.query('UPDATE rewards SET text = ? WHERE reward_id = ?', [text, id], (err, result) => {
        res.json(result);
    });
});

// Delete reward
router.delete('/delete', (req, res) => {
    const { id } = req.body;

    connection.query('DELETE FROM rewards WHERE reward_id = ?; DELETE FROM requirements WHERE reward_id = ?', [id, id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;