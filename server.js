const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const RedisStore = require('connect-redis').default;
const session = require('express-session');
const passport = require('passport');
const passportSetUp = require('./auth');
const { isLoggedIn } = require('./middleware');

// Routes
const authRoutes = require('./routes/auth');
const miscRoutes = require('./routes/misc');
const todoRoutes = require('./routes/todos');
const rewardRoutes = require('./routes/rewards');
const requirementRoutes = require('./routes/requirements');
const settingsRoutes = require('./routes/settings');

const app = express();
const port = process.env.PORT || 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://rewarded.dev',
    credentials: true
}));

let redisClient = redis.createClient({url: process.env.REDIS_URL});
redisClient.connect().catch(console.error);

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'raspberry',
    resave: false,
    saveUninitialized: false    
}));

app.use(passport.initialize());
app.use(passport.session());
passportSetUp();

app.use('/api', isLoggedIn);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/auth', authRoutes);
app.use('/api', miscRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/reward', rewardRoutes);
app.use('/api/requirement', requirementRoutes);
app.use('/api/settings', settingsRoutes);

app.listen(port, () => {
    console.log('Server started');
});