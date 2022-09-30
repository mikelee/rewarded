const express = require('express');
const router = express.Router();
const connection = require('../db');
const { isRewardOwner } = require('../middleware');

// Get rewards
router.get('/', (req, res) => {
    const { user_id } = req.user;

    connection.query('SELECT reward_id AS rewardId, text FROM rewards WHERE user_id = ?', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create reward
router.post('/create', (req, res) => {
    const { user_id } = req.user;

    connection.query('INSERT INTO rewards (user_id) VALUES (?)', [user_id], (err, result) => {
        res.json(result);
    });
});

// Update reward
router.put('/update', isRewardOwner, (req, res) => {
    const { reward_id, text } = req.body;

    connection.query('UPDATE rewards SET text = ? WHERE reward_id = ?', [text, reward_id], (err, result) => {
        res.json(result);
    });
});

// Delete reward
router.delete('/delete', isRewardOwner, (req, res) => {
    const { reward_id } = req.body;

    connection.query('DELETE FROM rewards WHERE reward_id = ?; DELETE FROM requirements WHERE reward_id = ?', [reward_id, reward_id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;