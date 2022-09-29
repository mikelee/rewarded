const connection = require('./db');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.send('You must be logged in');
    }
}

const isTodoOwner = (req, res, next) => {
    const todo_id = req.body.id;
    const { user_id } = req.user;
    
    connection.query(`
        SELECT EXISTS
        (
            SELECT *
            FROM todos
            WHERE todo_id = ? AND user_id = ?
        )
        as isOwner;
    `, [todo_id, user_id], (err, result) => {
        // isOwner may also be 0 if the todo_id doesn't exist
        const isOwner = result[0].isOwner;

        if (!isOwner) {
            res.status(403);
            return res.send('You are not authorized');
        }

        next();
    });
};

module.exports = {
    isLoggedIn,
    isTodoOwner
}

