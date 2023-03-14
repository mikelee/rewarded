const express = require('express');
const router = express.Router();
const sql = require('../db');

// Get all todos, rewards, and requirements
router.get('/user-data', async (req, res) => {
    const { user_id } = req.user;

    const todosQuery = sql`
        SELECT todo_id AS "todoId", text, completed, timestamp
        FROM todos
        WHERE user_id = ${user_id}
        ORDER BY completed, todo_id desc;
    `;

    const rewardsQuery = sql`
        SELECT reward_id AS "rewardId", text, completed, timestamp
        FROM rewards
        WHERE user_id = ${user_id};
    `;

    const requirementsQuery = sql`
        SELECT q.reward_id AS "rewardId", q.todo_id AS "todoId", t.text as text, t.completed AS completed, t.timestamp
        FROM requirements q
        LEFT JOIN todos t 
        ON q.todo_id = t.todo_id
        WHERE t.user_id = ${user_id};
    `;

    const settingsQuery = sql`
        SELECT color_theme, sort
        FROM SETTINGS WHERE user_id = ${user_id};
    `;
    
    const userData = await Promise.all([
        todosQuery,
        rewardsQuery,
        requirementsQuery,
        settingsQuery
    ]);
    
    res.json(userData);
});

module.exports = router;