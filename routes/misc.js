const express = require('express');
const router = express.Router();
const sql = require('../db');
const { isRewardOwner } = require('../middleware');

// Get all todos, rewards, and requirements
router.get('/user-data', async (req, res) => {
    const { user_id } = req.user;

    const todosQuery = sql`
        SELECT todo_id AS "todoId", text, completed
        FROM todos
        WHERE user_id = ${user_id}
        ORDER BY completed, todo_id desc;
    `;

    const rewardsQuery = sql`
        SELECT reward_id AS "rewardId", text
        FROM rewards
        WHERE user_id = ${user_id};
    `;

    const requirementsQuery = sql`
        SELECT q.reward_id AS "rewardId", q.todo_id AS "todoId", t.text as text, t.completed AS completed
        FROM requirements q
        LEFT JOIN todos t 
        ON q.todo_id = t.todo_id
        WHERE t.user_id = ${user_id};
    `;

    const settingsQuery = sql`
        SELECT color_theme
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

// Get requirements and todos
router.get('/todos-for-selection', isRewardOwner, async (req, res) => {
    const { reward_id } = req.query;
    const { user_id } = req.user;

    const todosForSelection = await sql`
        SELECT *
        FROM (
            SELECT
                t.todo_id AS "todoId",
                t.text AS text,
                q.reward_id AS "rewardId",
                t.completed AS completed
            FROM todos t
            LEFT JOIN requirements q
            ON t.todo_id = q.todo_id
            WHERE q.reward_id = ${reward_id} AND t.user_id = ${user_id}
            GROUP BY "todoId", t.text, q.reward_id, t.completed

            UNION
            
            SELECT
                t.todo_id AS "todoId",
                t.text AS text,
                q.reward_id AS "rewardId",
                t.completed AS completed
            FROM todos t
            LEFT JOIN requirements q
            ON t.todo_id = q.todo_id
            WHERE (q.reward_id <> ${reward_id} OR q.reward_id IS NULL) AND t.user_id = ${user_id}
            GROUP BY "todoId", t.text, q.reward_id, t.completed
        ) AS a
        GROUP BY "todoId", text, "rewardId", completed
        ORDER BY completed, "todoId" desc;
    `;

    res.json(todosForSelection);
});

module.exports = router;