const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.send('You must be logged in');
    }
}

module.exports = {
    isLoggedIn
}

