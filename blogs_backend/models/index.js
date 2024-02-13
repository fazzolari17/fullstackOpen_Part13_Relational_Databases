const Blog = require('./blog.js');
const User = require('./user.js');
const ReadingList = require('./readingList.js');

User.hasMany(Blog);
Blog.belongsTo(User); 


// The Following code is used for the many-to-many relationship
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });
// User.belongsToMany(Blog, { through: ReadingList });
Blog.belongsToMany(User, { through: ReadingList });

ReadingList.belongsTo(User);
ReadingList.belongsTo(Blog);

User.hasMany(ReadingList);

module.exports = {
  Blog,
  ReadingList,
  User
};