const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get requirements
router.post('/get', (req, res) => {
    const { userId } = req.body;

    connection.query('SELECT * FROM to_dos t INNER JOIN requirements q ON t.to_do_id = q.to_do_id WHERE t.owner_id = ?', [userId], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create or Delete requirement
router.post('/toggle', (req, res) => {
    const { toDoId, rewardId, selected } = req.body;

    if (selected) {
        connection.query('DELETE FROM requirements WHERE reward_id = ? AND to_do_id = ?', [rewardId, toDoId], (err, results) => {
            if (!err) {
                res.json(results);
            } else {
                console.log(err);
            }
        });
    } else {
        connection.query('INSERT INTO requirements (reward_id, to_do_id) VALUES (?, ?)', [rewardId, toDoId], (err, results) => {
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
    const { reward_id, to_do_id } = req.body;

    connection.query('DELETE FROM requirements WHERE reward_id = ? AND to_do_id = ?', [reward_id, to_do_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;