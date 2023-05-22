const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sql = require('./db');

module.exports = passportSetUp = () => {
    passport.use('local-sign-up', new LocalStrategy({
        passReqToCallback: true
    },
        async function(req, username1, password1, done) {
            const { username, password } = req.body;

            const foundUser = await sql`
                SELECT * FROM users
                WHERE username = ${username};
            `;

            const user = foundUser[0];

            if (user) {
                return done(null, false, { message: 'This username already exists' });
            } else {
                bcrypt.hash(password, 10, async (err, hash) => {

                    const newUser = await sql`
                        INSERT INTO users (username, hash)
                        VALUES (${username}, ${hash})
                        RETURNING user_id AS "userId";
                    `;

                    const newUserId = newUser[0].userId;

                    await sql`
                        INSERT INTO settings (user_id)
                        VALUES (${newUserId});
                    `;

                    const passportUser = {user_id: newUserId, username: username};
                    return done(null, passportUser)
                });
            }
        }
    ));

    passport.use('local-sign-in', new LocalStrategy({
        passReqToCallback: true
    },
        async function(req, username1, password1, done) {
            const { username, password } = req.body;

            console.log('username:', username)

            const foundUser = await sql`
                SELECT * FROM users
                WHERE username = ${username};
            `;

            console.log('foundUser:', foundUser)

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
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
};