const express = require('express');
const router = express.Router();
const connection = require('../db');

// Get to_dos
router.post('/get', (req, res) => {
    const { user_id } = req.body;

    connection.query('SELECT * FROM to_dos WHERE owner_id = ?', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create to-do
router.post('/create', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO to_dos (owner_id) VALUES (?)', [user_id], (err, result) => {
        res.json(result);
    });
});

// Update to-do
router.put('/update', (req, res) => {
    const { id, text } = req.body;

    connection.query('UPDATE to_dos SET text = ? WHERE to_do_id = ?', [text, id], (err, result) => {
        res.json(result);
    });
});

// Toggle to-do Completed
router.post('/complete', (req, res) => {
    const { id } = req.body;

    connection.query('UPDATE to_dos SET completed = NOT completed WHERE to_do_id = ?', [id], (err, result) => {
        res.json(result);
    });
});

// Delete to-do
router.delete('/delete', (req, res) => {
    const { id } = req.body;

    connection.query('DELETE FROM to_dos WHERE to_do_id = ?; DELETE FROM requirements WHERE to_do_id = ?', [id ,id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;