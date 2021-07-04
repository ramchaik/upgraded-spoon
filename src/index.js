const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});

const { urlRouter, userRouter } = require('./routes');
const { urlController } = require('./controllers');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60000 
    }
  })
);

app.get('/', urlController.get);
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/users', userRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log('listen on port ' + PORT);
  });
});
