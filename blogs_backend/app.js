const express = require('express');
require('express-async-errors');
const { json } = require('express');
const { SESSION_SECRET } = require('./util/config.js');
const {
  authorRouter,
  blogRouter,
  userRouter,
  loginRouter,
  readingListRouter,
} = require('./controllers');
const middleware = require('./util/middleware.js');
const { sequelize } = require('./util/db.js');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();

app.use(json());
app.use(middleware.requestLogger);


const fifteenMinutes = 15 * 60 * 1000;
const tenMinutes = 10 * 60 * 1000;

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'user_sessions',
  checkExpirationInterval: fifteenMinutes,
  expiration: tenMinutes,
});


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}))
app.use('/api/', loginRouter);
app.get('/api/health', (_req, res) => res.status(200).send({ status: 200, health: 'ok' }));

app.use(middleware.isAuthenticated)
app.use('/api/authors/', authorRouter);
app.use('/api/blogs/', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/readinglists/', readingListRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;