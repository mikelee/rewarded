const sql = require('./db');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.send('You must be logged in');
    }
}

const isOwnerQuery = (item, item_id, user_id) => {
    return new Promise(async (resolve, reject) => {
        if (item === 'todo') {
            const query = await sql`
                SELECT EXISTS
                (
                    SELECT *
                    FROM todos
                    WHERE todo_id = ${item_id} AND user_id = ${user_id}
                )
                as "doesExist";
            `;

            const doesExist = query[0].doesExist;
    
            return resolve(doesExist);
        } else {
            const query = await sql`
                SELECT EXISTS
                (
                    SELECT *
                    FROM rewards
                    WHERE reward_id = ${item_id} AND user_id = ${user_id}
                )
                as "doesExist";
            `;

            const doesExist = query[0].doesExist;
    
            return resolve(doesExist);
        }
    });
}

const isRewardOwner = async (req, res, next) => {
    const reward_id = req.body.reward_id !== undefined ? req.body.reward_id : req.query.reward_id;
    const { user_id } = req.user;

    const isRewardOwner = await isOwnerQuery('reward', reward_id, user_id);

    if (!isRewardOwner) return forbidden(res);

    next();
}

const isTodoOwner = async (req, res, next) => {
    const { todo_id } = req.body;
    const { user_id } = req.user;

    const isTodoOwner = await isOwnerQuery('todo', todo_id, user_id);

    if (!isTodoOwner) return forbidden(res);

    next();
}

const isRequirementOwner = async (req, res, next) => {
    const { reward_id, todo_id } = req.body;
    const { user_id } = req.user;

    const isRewardOwner = await isOwnerQuery('reward', reward_id, user_id);
    const isTodoOwner = await isOwnerQuery('todo', todo_id, user_id);

    if (!isRewardOwner || !isTodoOwner) return forbidden(res);

    next();
}

const forbidden = res => {
    res.status(403);
    res.send('Forbidden. You are not authorized.');
}

module.exports = {
    isLoggedIn,
    isRewardOwner,
    isRequirementOwner,
    isTodoOwner
}