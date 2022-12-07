const express = require('express');
const router = express.Router();
const sql = require('../db');
const { isRequirementOwner } = require('../middleware');

// Get requirements
router.get('/', async (req, res) => {
    const { user_id } = req.user;

    const requirements = await sql`
        SELECT t.todo_id AS "todoId", text, completed, reward_id AS "rewardId" 
        FROM todos t 
        INNER JOIN requirements q
        ON t.todo_id = q.todo_id 
        WHERE t.user_id = ${user_id} ORDER BY t.completed;
    `;

    res.json(requirements);
});

// Create or Delete requirement
router.post('/toggle', isRequirementOwner, async (req, res) => {
    const { reward_id, todo_id, selected } = req.body;

    if (selected) {
        const result = await sql`
            DELETE FROM requirements
            WHERE reward_id = ${reward_id} AND todo_id = ${todo_id};
        `;
    
        res.json(result);
    } else {
        const result = await sql`
            INSERT INTO requirements (reward_id, todo_id)
            VALUES (${reward_id}, ${todo_id});
        `;

        res.json(result);
    }
});

// Delete requirement
router.delete('/delete', isRequirementOwner, async (req, res) => {
    const { reward_id, todo_id } = req.body;

    const result = await sql`
        DELETE FROM requirements
        WHERE reward_id = ${reward_id} AND todo_id = ${todo_id};
    `;

    res.json(result);
});

module.exports = router;