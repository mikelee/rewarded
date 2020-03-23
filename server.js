const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const redis = require('redis');
const session = require('express-session');
const connection = require('./db');
const app = express();

// Routes
const indexRoutes = require('./routes/index');
const toDoRoutes = require('./routes/toDos');
const rewardRoutes = require('./routes/rewards');
const requirementRoutes = require('./routes/requirements');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cors());

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient(process.env.REDIS_URL);
app.use(session({
    store: new RedisStore({ client: redisClient }),
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

app.use('/', indexRoutes);
app.use('/api/todo', toDoRoutes);
app.use('/api/reward', rewardRoutes);
app.use('/api/requirement', requirementRoutes);

app.listen(process.env.PORT || 4444, () => {
    console.log('Server started');
});