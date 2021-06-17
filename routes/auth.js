const express = require('express');
const router = express.Router();
const passport = require('passport');

// Sign-Up route
router.post('/sign-up', (req, res, next) => {
    passport.authenticate('local-sign-up', (err, user, info) => {
        if (info) {
            return res.json({ errorMessage: info.message })
        } else if (user) {
            return res.json({ user: user });
        }
    })(req, res, next);
});

// Sign-In route
router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local-sign-in', (err, user, info) => {
        if (info) {
            return res.json({ errorMessage: info.message })
        } else if (user) {
            req.logIn(user, (err) => {
                if (!err) {
                    return res.json({ user: user });
                }
            });
        }
    })(req, res, next);
});

// Logout route
router.post('/logout', (req, res) => {
    req.logout();
    res.send(true);
});

module.exports = router;