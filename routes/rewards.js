const express = require('express');
const router = express.Router();
const sql = require('../db');
const { isRewardOwner } = require('../middleware');

// Get rewards
router.get('/', async (req, res) => {
    const { user_id } = req.user;

    const rewards = await sql`
        SELECT reward_id AS "rewardId", text
        FROM rewards
        WHERE user_id = ${user_id};
    `;

    res.json(rewards);
});

// Create reward
router.post('/create', async (req, res) => {
    const { user_id } = req.user;

    const result = await sql`
        INSERT INTO rewards (user_id)
        VALUES (${user_id});
    `;

    res.json(result);
});

// Update reward
router.put('/update', isRewardOwner, async (req, res) => {
    const { reward_id, text } = req.body;

    const result = await sql`
        UPDATE rewards
        SET text = ${text}
        WHERE reward_id = ${reward_id};
    `;

    res.json(result);
});

// Delete reward
router.delete('/delete', isRewardOwner, async (req, res) => {
    const { reward_id } = req.body;

    const rewardsQuery = sql`
        DELETE FROM rewards
        WHERE reward_id = ${reward_id};
    `;

    const requirementsQuery = sql`
        DELETE FROM requirements
        WHERE reward_id = ${reward_id};
    `;

    const result = await Promise.all([rewardsQuery, requirementsQuery]);

    res.json(result);
});

module.exports = router;