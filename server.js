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

        connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, foundUser) => {
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
                        connection.query(`INSERT INTO users (username, hash) VALUES ('${username}', '${hash}')`, (err, newUser) => {
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
    connection.query(`SELECT * FROM to_dos WHERE owner_id = '${req.user.user_id}'`, (err, results) => {
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


// To-do Routes

// Get all to-dos
app.post('/api', (req, res) => {
    const { user_id } = req.body;

    connection.query(`SELECT * FROM to_dos WHERE owner_id = '${user_id}'`, (err, results) => {
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

    connection.query(`INSERT INTO to_dos (owner_id) VALUES ('${user_id}')`, (data) => {
        res.send(data);
    });
});

// Update to-do
app.put('/api/todo/:id', (req, res) => {
    connection.query(`UPDATE to_dos SET text = '${req.body.text}' WHERE to_do_id = '${req.params.id}'`, () => {
        res.redirect('/');
    });
});

// Delete to-do
app.delete('/api/todo/:id', (req, res) => {
    connection.query(`DELETE FROM to_dos WHERE to_do_id = '${req.params.id}'`, () => {
        res.redirect('/');
    });
});

app.listen(process.env.PORT || 4444, () => {
    console.log('Server started');
});