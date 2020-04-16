const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const connection = require('./db');

module.exports = passportSetUp = () => {
    passport.use('local-sign-up', new LocalStrategy({
        passReqToCallback: true
    },
        function(req, username1, password1, done) {
            const { username, password } = req.body;

            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, foundUser) => {
                if (!err) {
                    const user = foundUser[0];

                    if (user) {
                        return done(null, false, { message: 'This username already exists' });
                    } else {
                        bcrypt.hash(password, 10, (err, hash) => {
                            connection.query('INSERT INTO users (username, hash) VALUES (?, ?)', [username, hash], (err, newUser) => {
                                if (!err) {
                                    const passportUser = {user_id: newUser.insertId, username: username}
                                    return done(null, passportUser)
                                }
                            });
                        });
                    }
                } else {
                    console.log(err);
                }
            });
        }
    ));

    passport.use('local-sign-in', new LocalStrategy({
        passReqToCallback: true
    },
        function(req, username1, password1, done) {
            const { username, password } = req.body;

            connection.query('SELECT * FROM users WHERE username = ?', [username], (err, foundUser) => {
                if (!err) {
                    const user = foundUser[0];

                    if (user) {
                        bcrypt.compare(password, user.hash, (err, res) => {
                            if (res === true) {
                                const passportUser = {user_id: user.user_id, username: user.username};
                                return done(null, passportUser);
                            } else {
                                return done(null, false, { message: 'Incorrect username or password' });
                            }
                        });
                    } else {
                        return done(null, false, { message: 'Incorrect username or password' });
                    }
                } else {
                    console.log(err);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};