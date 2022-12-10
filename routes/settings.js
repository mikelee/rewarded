const express = require('express');
const router = express.Router();
const sql = require('../db');

router.put('/color-theme/update', async (req, res) => {
    const { color, userId: user_id } = req.body;

    const result = await sql`
        UPDATE settings
        SET color_theme = ${color}
        WHERE user_id = ${user_id};
    `;

    res.json(result);
});

module.exports = router;