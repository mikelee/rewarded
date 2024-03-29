const express = require('express');
const router = express.Router();
const sql = require('../db');
const { isRewardOwner } = require('../middleware');

// Get rewards
router.get('/', async (req, res) => {
    const { user_id } = req.user;

    const rewards = await sql`
        SELECT reward_id AS "rewardId", text, completed, timestamp
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
        VALUES (${user_id})
        RETURNING reward_id AS "rewardId", text, completed, timestamp
    `;

    const newReward = result[0];

    res.json(newReward);
});

// Update reward
router.put('/update', isRewardOwner, async (req, res) => {
    const { reward_id, text } = req.body;

    const result = await sql`
        UPDATE rewards
        SET text = ${text}
        WHERE reward_id = ${reward_id}
        RETURNING reward_id AS "rewardId", text, completed, timestamp
    `;

    const updatedReward = result[0];

    res.json(updatedReward);
});

router.put('/complete', isRewardOwner, async (req, res) => {
    const { reward_id, completed } = req.body;

    const result = await sql`
        UPDATE rewards
        SET completed = ${completed}
        WHERE reward_id = ${reward_id}
        RETURNING reward_id AS "rewardId", text, completed, timestamp
    `;

    const updatedReward = result[0];

    res.json(updatedReward);
});

// Delete reward
router.delete('/delete', isRewardOwner, async (req, res) => {
    const { reward_id } = req.body;

    const rewardsQuery = sql`
        DELETE FROM rewards
        WHERE reward_id = ${reward_id}
        RETURNING reward_id AS "rewardId", text, completed, timestamp
    `;

    const requirementsQuery = sql`
        DELETE FROM requirements
        WHERE reward_id = ${reward_id}
        RETURNING reward_id AS "rewardId", todo_id AS "todoId";
    `;

    const result = await Promise.all([rewardsQuery, requirementsQuery]);

    const deletedData = {
        reward: result[0][0],
        requirements: result[1]
    }

    res.json(deletedData);
});

module.exports = router;