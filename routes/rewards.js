const express = require('express');
const router = express.Router();
const connection = require('../db');

// Create reward
router.post('/create', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO rewards (owner_id) VALUES (?)', [user_id], (err, result) => {
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

    connection.query('DELETE FROM rewards WHERE reward_id = ?', [id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;