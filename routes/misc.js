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

    /* 
        From inside out
        1) Selects from todos joined with requirements that have the selected reward_id.
        2) Selects from the todos joined with requirements that don't have the selected reward_id.
        3) Combines those two queries (steps 1 and 2) together using UNION ALL to keep the original order.
            This gets all todos joined with requirements, putting the rows with the selected reward_id first.
        4) Selects all from the union (step 3) and removes duplicate rows with the same todoId by using DISTINCT ON.
            It keeps the rows with the selected reward_id. This is why the rows with the selected reward_id had to be first.
        5) Selects all from step 4 and orders by completed.
            Step 4 couldn't be organized by completed because DISTINCT ON requires it to be ordered by the todoId first.
    */
    const todosForSelection = await sql`
        SELECT *
        FROM
            (SELECT
            DISTINCT ON (a."todoId")
                a."todoId",
                a.text,
                a.completed,
                a."rewardId"
            FROM
                (SELECT
                    t.todo_id AS "todoId",
                    t.text,
                    t.completed,
                    q.reward_id as "rewardId"
                FROM todos t
                LEFT JOIN requirements q
                ON t.todo_id = q.todo_id
                WHERE user_id = ${user_id} AND q.reward_id = ${reward_id}

                UNION ALL

                SELECT
                    t.todo_id AS "todoId",
                    t.text,
                    t.completed,
                    q.reward_id as "rewardId"
                FROM todos t
                LEFT JOIN requirements q
                ON t.todo_id = q.todo_id
                WHERE user_id = ${user_id} AND (q.reward_id <> ${reward_id} OR q.reward_id IS NULL)
                ) as a
            ORDER BY a."todoId" desc
            ) as b
        ORDER BY b.completed;
    `;

    res.json(todosForSelection);
});

module.exports = router;