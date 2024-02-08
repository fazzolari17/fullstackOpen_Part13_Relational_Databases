const express = require('express');
const { json } = require('express');
const { PORT } = require('./util/config.js');
const { connectToDatabase } = require('./util/db.js');
const blogRouter = require('./controllers/blog.js');
const middleware = require('./util/middleware.js');
require('express-async-errors');
const app = express();

app.use(json());
app.use(middleware.requestLogger);

app.use('/api/blogs/', blogRouter);

app.use(middleware.unknownEndpoint);

app.get('/api/health', (req, res) => {
  res.status(200).send({ status: 200, health: 'ok' })
});

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
};

start()