const express = require('express');
const router = express.Router();
const connection = require('../db');

router.put('/color-theme/update', (req, res) => {
    const { color, user_id } = req.body;

    connection.query('UPDATE settings SET color_theme = ? WHERE user_id = ?', [color, user_id], (err, result) => {
        res.json(result);
    });
});

module.exports = router;