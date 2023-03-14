const express = require('express');
const router = express.Router();
const sql = require('../db');

router.put('/color-theme/update', async (req, res) => {
    const { user_id } = req.user;
    const { color } = req.body;

    const result = await sql`
        UPDATE settings
        SET color_theme = ${color}
        WHERE user_id = ${user_id};
    `;

    res.json(result);
});

router.put('/sort/update', async (req, res) => {
    const { user_id } = req.user;
    const { sort } = req.body;

    const result = await sql`
        UPDATE settings
        SET sort = ${sort}
        WHERE user_id = ${user_id};
    `;

    res.json(result);
});

module.exports = router;