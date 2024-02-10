const Blog = require('./blog.js');
const User = require('./user.js');

// syncs the database to the model
User.sync();
Blog.sync();

User.hasMany(Blog); //{ foreignKey: 'userId' }
Blog.belongsTo(User); //{ foreignKey: 'userId' }

module.exports = {
  Blog,
  User
};