const Blog = require('./blog.js');
const User = require('./user.js');

// syncs the database to the model
User.sync();
Blog.sync();

User.hasMany(Blog, { as: 'blogs', foreignKey: 'userId' }); //{ foreignKey: 'userId' }
Blog.belongsTo(User, { as: 'users', foreignKey: 'userId' }); //{ foreignKey: 'userId' }

module.exports = {
  Blog,
  User
};