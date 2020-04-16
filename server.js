const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const redis = require('redis');
const session = require('express-session');
const passport = require('passport');
const passportSetUp = require('./auth');

// Routes
const indexRoutes = require('./routes/index');
const toDoRoutes = require('./routes/toDos');
const rewardRoutes = require('./routes/rewards');
const requirementRoutes = require('./routes/requirements');

const app = express();
const port = process.env.PORT || 4444;

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

app.use(passport.initialize());
app.use(passport.session());
passportSetUp();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
  
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use('/', indexRoutes);
app.use('/api/todo', toDoRoutes);
app.use('/api/reward', rewardRoutes);
app.use('/api/requirement', requirementRoutes);

app.listen(port, () => {
    console.log('Server started');
});