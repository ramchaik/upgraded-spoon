const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');

require('dotenv-safe').config();

const {
  REDIS_URL,
  MONGO_URI,
  PORT,
  REDIS_PORT,
  SESSION_SECRET,
} = require('../config');

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const { urlRouter, userRouter } = require('./routes');
const { urlController } = require('./controllers');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000,
    },
  })
);

// Views
app.get('/', urlController.get);
app.get('/login', urlController.renderLogin);
app.get('/register', urlController.renderRegister);

// APIs
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/users', userRouter);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log('listen on port ' + PORT);
  });
});
