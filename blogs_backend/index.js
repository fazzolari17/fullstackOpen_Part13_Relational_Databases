const express = require('express');
require('express-async-errors');
const { json } = require('express');
const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');
const { authorRouter, blogRouter, userRouter, loginRouter } = require('./controllers');
// const userRouter = require('./controllers/user.js');
// const loginRouter = require('./controllers/login.js');
const middleware = require('./util/middleware.js');
const app = express();

app.use(json());
app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);

app.use('/api/authors/', authorRouter);
app.use('/api/blogs/', middleware.userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login/', loginRouter);
app.get('/api/health', (req, res) => res.status(200).send({ status: 200, health: 'ok' }));

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
};

start()