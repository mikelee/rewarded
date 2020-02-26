const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

// import mysql from './config';
const config = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());
app.use(session({
    secret: 'raspberry',
    resave: false,
    saveUninitialized: false    
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({
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
                        }
                    });
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

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

const connection = mysql.createConnection(config);
connection.connect(err => {
    if (err) {
        console.log(err)
    };
});


// Authentication Routes

// Sign-In route
app.post('/sign-in', 
  passport.authenticate('local', { failureRedirect: '/sign-in' }), (req, res) => {
    connection.query('SELECT * FROM to_dos WHERE owner_id = ?', [req.user.user_id], (err, results) => {
        if (!err) {
            return res.json({
                user: req.user,
                to_dos: results
            });
        } else {
            console.log(err);
        }
    });
  });

// Logout route
app.post('/logout', (req, res) => {
    req.logout();
});

// Data

// Get all to-dos, rewards, and requirements
app.post('/api', (req, res) => {
    const { user_id } = req.body;

    connection.query(`
        SELECT * FROM to_dos WHERE owner_id = ?;
        SELECT * FROM rewards WHERE owner_id = ?;
        SELECT q.reward_id AS reward_id, q.to_do_id AS to_do_id, t.completed AS completed FROM requirements q LEFT JOIN to_dos t ON q.to_do_id = t.to_do_id WHERE t.owner_id = ?;
    `, [user_id, user_id, user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});


// To-do Routes

// Get to_dos
app.post('/api/todo/get', (req, res) => {
    const { user_id } = req.body;

    connection.query('SELECT * FROM to_dos WHERE owner_id = ?', [user_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create to-do
app.post('/api/todo', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO to_dos (owner_id) VALUES (?)', [user_id], (err, result) => {
        res.send(result);
    });
});

// Update to-do
app.put('/api/todo/:id', (req, res) => {
    const { id, text } = req.body;

    connection.query('UPDATE to_dos SET text = ? WHERE to_do_id = ?', [text, id], (err, result) => {
        res.send(result);
    });
});

// Toggle to-do Completed
app.post('/api/todo/complete', (req, res) => {
    const { id } = req.body;

    connection.query('UPDATE to_dos SET completed = NOT completed WHERE to_do_id = ?', [id], (err, result) => {
        res.send(result);
    });
});

// Delete to-do
app.delete('/api/todo/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM to_dos WHERE to_do_id = ?; DELETE FROM requirements WHERE to_do_id = ?', [id ,id], (err, result) => {
        res.send(result);
    });
});



// Reward routes

// Create reward
app.post('/api/reward', (req, res) => {
    const { user_id } = req.body;

    connection.query('INSERT INTO rewards (owner_id) VALUES (?)', [user_id], (err, result) => {
        res.send(result);
    });
});

// Update Reward
app.put('/api/reward/:id', (req, res) => {
    const { id, text } = req.body;

    connection.query('UPDATE rewards SET text = ? WHERE reward_id = ?', [text, id], (err, result) => {
        res.send(result);
    });
});

// Delete Reward
app.delete('/api/reward/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM rewards WHERE reward_id = ?', [id], (err, result) => {
        res.send(result);
    });
});


// Requirement Routes

// Get requirements
app.post('/api/requirements', (req, res) => {
    const { id } = req.body;

    connection.query('SELECT * FROM to_dos t INNER JOIN requirements q ON t.to_do_id = q.to_do_id WHERE reward_id = ?', [id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Get requirements and to-dos
app.post('/api/get-requirements-and-todos', (req, res) => {
    const { reward_id, owner_id } = req.body;

    connection.query(`
        SELECT *
        FROM (
            SELECT
                t.to_do_id AS to_do_id,
                t.text AS text,
                q.reward_id AS reward_id,
                t.completed AS completed,
                t.owner_id AS owner_id
            FROM to_dos t
            LEFT JOIN requirements q
            ON t.to_do_id = q.to_do_id
            WHERE q.reward_id = ? AND t.owner_id = ?
            GROUP BY to_do_id

            UNION
            
            SELECT
                t.to_do_id AS to_do_id,
                t.text AS text,
                q.reward_id AS reward_id,
                t.completed AS completed,
                t.owner_id AS owner_id
            FROM to_dos t
            LEFT JOIN requirements q
            ON t.to_do_id = q.to_do_id
            WHERE q.reward_id <> ? OR q.reward_id IS NULL AND t.owner_id = ?
            GROUP BY to_do_id
        ) AS a
        GROUP BY to_do_id;
    `, [reward_id, owner_id, reward_id, owner_id], (err, results) => {
        if (!err) {
            res.json(results);
        } else {
            console.log(err);
        }
    });
});

// Create or Delete requirement
app.post('/api/requirements/toggle', (req, res) => {
    const { toDoId, rewardId, selected } = req.body;

    if (selected) {
        connection.query('DELETE FROM requirements WHERE reward_id = ? AND to_do_id = ?', [rewardID, toDoId], (err, results) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        });
    } else {
        connection.query('INSERT INTO requirements (reward_id, to_do_id) VALUES (?, ?)', [rewardId, toDoId], (err, results) => {
            if (!err) {
                res.send(results);
            } else {
                console.log(err);
            }
        });
    }
});

// Delete Requirement
app.delete('/api/requirements/:id', (req, res) => {
    const { reward_id, to_do_id } = req.body;

    connection.query('DELETE FROM requirements WHERE reward_id = ? AND to_do_id = ?', [reward_id, to_do_id], (err, results) => {
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
        }
    });
});


app.listen(process.env.PORT || 4444, () => {
    console.log('Server started');
});