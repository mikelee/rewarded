const express = require('express');
const router = express.Router();
const sql = require('../db');
const { isTodoOwner } = require('../middleware');

// Get todos
router.get('/', async (req, res) => {
    const { user_id } = req.user;

    const todos = await sql`
        SELECT todo_id AS "todoId", text, completed
        FROM todos
        WHERE user_id = ${user_id}
        ORDER BY completed, todo_id desc;
    `;

    res.json(todos);
});

// Create todo
router.post('/create', async (req, res) => {
    const { user_id } = req.user;

    const result = await sql`
        INSERT INTO todos (user_id)
        VALUES (${user_id})
        RETURNING todo_id AS "todoId", text, completed;
    `;

    const newTodo = result[0];

    res.json(newTodo);
});

// Update todo
router.put('/update', isTodoOwner, async (req, res) => {
    const { todo_id, text } = req.body;

    const result = await sql`
        UPDATE todos
        SET text = ${text}
        WHERE todo_id = ${todo_id}
        RETURNING todo_id AS "todoId", text, completed;
    `;

    const updatedTodo = result[0];

    res.json(updatedTodo);
});

// Toggle todo Completed
router.post('/complete', isTodoOwner, async (req, res) => {
    const { todo_id } = req.body;

    const result = await sql`
        UPDATE todos
        SET completed = NOT completed
        WHERE todo_id = ${todo_id}
        RETURNING todo_id AS "todoId", text, completed;
    `;

    const updatedTodo = result[0];

    res.json(updatedTodo);
});

// Delete todo
router.delete('/delete', isTodoOwner, async (req, res) => {
    const { todo_id } = req.body;

    const todosQuery = sql`
        DELETE FROM todos
        WHERE todo_id = ${todo_id}
        RETURNING todo_id AS "todoId", text, completed;
    `;

    const requirementsQuery = sql`
        DELETE FROM requirements
        WHERE todo_id = ${todo_id}
        RETURNING reward_id AS "rewardId", todo_id AS "todoId";
    `;

    const result = await Promise.all([todosQuery, requirementsQuery]);

    const deletedData = {
        todo: result[0][0],
        requirements: result[1]
    }

    res.json(deletedData);
});

module.exports = router;