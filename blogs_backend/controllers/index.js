const authorRouter = require('./authors.js');
const blogRouter = require('./blog.js');
const userRouter = require('./user.js');
const loginRouter = require('./login.js');
const readingListRouter = require('./readingList.js');

module.exports = {
  authorRouter,
  blogRouter,
  loginRouter,
  userRouter,
  readingListRouter
}