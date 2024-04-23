import bcrypt from 'bcrypt';

const deleteTestData = async (sql) => {
    return new Promise(async (resolve, reject) => {
        try {        
            await sql`
                DELETE FROM requirements;
            `;
        
            await sql`
                DELETE FROM todos;
            `;
        
            await sql`
                DELETE FROM rewards;
            `;

            await sql`
                DELETE FROM settings;
            `;

            await sql`
                DELETE FROM users;
            `;
    
            resolve('Successfully deleted all data from test database.');
        } catch (error) {
            reject(`Error deleting test user data from database: ${error}`);
        }
    });
}

const seedTestData = (sql, username, password) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) return err;

                const testUser = await sql`
                    INSERT INTO users (username, hash)
                    VALUES (${username}, ${hash})
                    RETURNING user_id AS "userId";
                `;

                const testUserId = testUser[0].userId;

                await sql`
                    INSERT INTO settings (user_id)
                    VALUES (${testUserId});
                `;

                // Todos
                const todos = [];

                const todo1 = await sql`
                    INSERT INTO todos (user_id, text, completed)
                    VALUES (${testUserId}, 'Todo 1', true)
                    RETURNING *;
                `;
                const todo2 = await sql`
                    INSERT INTO todos (user_id, text)
                    VALUES (${testUserId}, 'Todo 2')
                    RETURNING *;
                `;

                todos.push(todo1[0]);
                todos.push(todo2[0]);

                // Rewards
                const rewards = [];

                const reward1 = await sql`
                    INSERT INTO rewards (user_id, text)
                    VALUES (${testUserId}, 'Reward 1')
                    RETURNING *;
                `;
                const reward2 = await sql`
                    INSERT INTO rewards (user_id, text)
                    VALUES (${testUserId}, 'Reward 2')
                    RETURNING *;
                `;

                rewards.push(reward1[0]);
                rewards.push(reward2[0]);

                // Requirements
                const requirements = [];

                const requirement1 = await sql`
                    INSERT INTO requirements (reward_id, todo_id)
                    VALUES (${rewards[0].reward_id}, ${todos[0].todo_id})
                    RETURNING *;
                `;
                const requirement2 = await sql`
                    INSERT INTO requirements (reward_id, todo_id)
                    VALUES (${rewards[1].reward_id}, ${todos[1].todo_id})
                    RETURNING *;
                `;

                requirements.push(requirement1[0]);
                requirements.push(requirement2[0]);

                const data = [
                    todos,
                    rewards,
                    requirements
                ];

                resolve(data);
            });
        } catch (error) {
            reject(`Error seeding test user data into database: ${error}`);
        }
    });
}

const getTestData = async (sql, username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const testUser = await sql`
                SELECT *
                FROM users
                WHERE username = ${username};
            `;
    
            const { user_id } = testUser[0];
        
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
                SELECT q.reward_id, q.todo_id AS "todoId", t.text as text, t.completed AS completed, t.timestamp
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
            
            resolve(userData);
        } catch (error) {
             reject(`Error getting test user data from database: ${error}`);
        }
    });
}

export default async (sql, username, password) => {
    try {
        await deleteTestData(sql);
        await seedTestData(sql, username, password);
        const userData = await getTestData(sql, username);
    
        return userData;
    } catch (error) {
        return error;
    }
}