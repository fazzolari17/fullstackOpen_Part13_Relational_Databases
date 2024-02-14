const authorRouter = require('express').Router();
const { Blog, User } = require('../models/index.js');
const { fn, col, literal } = require('sequelize');


authorRouter.get('/', async (req, res) => {

  const authorsWithBlogs = await User.findAll({
    attributes: [
      [literal('name'), 'Author'],
      [fn('COUNT', col('blogs')), 'articles'],
      [fn('SUM', col('blogs.likes')), 'likes'],
    ],
    include: [
      {
        model: Blog,
        as: 'blogs',
        attributes: [],
      },
    ],
    group: ['user.id'],
    order: [[fn('SUM', col('blogs.likes')), 'DESC']],
  });


  res.send(authorsWithBlogs)
})

module.exports = authorRouter