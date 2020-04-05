const express = require('express');
const router = express.Router();
const passport = require('passport');
const connection = require('../db');

// Authentication Routes

// Sign-Up route
router.post('/sign-up', 
    passport.authenticate('local-sign-up', { failureRedirect: '/sign-in' }), (req, res) => {
        return res.json({ user: req.user });
    }
);

// Sign-In route
router.post('/sign-in', 
    passport.authenticate('local-sign-in', { failureRedirect: '/sign-in' }), (req, res) => {
        return res.json({ user: req.user });
    }
);

// Logout route
router.post('/logout', (req, res) => {
    req.logout();
});


// Data

// Get all to-dos, rewards, and requirements
router.post('/api', (req, res) => {
    const { user_id } = req.body;

    connection.query(`
        SELECT * FROM to_dos WHERE owner_id = ?;
        SELECT * FROM rewards WHERE owner_id = ?;
        SELECT q.reward_id AS reward_id, q.to_do_id AS to_do_id, t.text as text, t.completed AS completed FROM requirements q LEFT JOIN to_dos t ON q.to_do_id = t.to_do_id WHERE t.owner_id = ?;
    `, [user_id, user_id, user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Get requirements and to-dos
router.post('/api/get-requirements-and-todos', (req, res) => {
    const { reward_id, owner_id } = req.body;

    connection.query(`
        SELECT *
        FROM (
            SELECT
                t.to_do_id AS to_do_id,
                t.text AS text,
                q.reward_id AS reward_id,
                t.completed AS completed,
                t.owner_id AS owner_id
            FROM to_dos t
            LEFT JOIN requirements q
            ON t.to_do_id = q.to_do_id
            WHERE q.reward_id = ? AND t.owner_id = ?
            GROUP BY to_do_id

            UNION
            
            SELECT
                t.to_do_id AS to_do_id,
                t.text AS text,
                q.reward_id AS reward_id,
                t.completed AS completed,
                t.owner_id AS owner_id
            FROM to_dos t
            LEFT JOIN requirements q
            ON t.to_do_id = q.to_do_id
            WHERE (q.reward_id <> ? OR q.reward_id IS NULL) AND t.owner_id = ?
            GROUP BY to_do_id
        ) AS a
        GROUP BY to_do_id
        ORDER BY to_do_id;
    `, [reward_id, owner_id, reward_id, owner_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

module.exports = router;