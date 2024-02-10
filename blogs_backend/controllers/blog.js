const express = require('express');
const { Blog, User } = require('../models/index.js');
const { blogFinder, blogChecker } = require('../util/middleware.js');

const blogRouter = express.Router();

blogRouter.put('/:id', blogFinder, async (req, res) => {
  const { blog } = req;
  blog.likes + 1;
  await blog.save()

  res.status(200).json({ likes: blog.likes })
})

blogRouter.get('/:id', blogFinder, async (req, res) => {
    const { blog } = req;
    res.status(200).send(blog)
})

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
        model: User
      }
    });
    res.status(200).json(blogs);
});

blogRouter.post('/', blogChecker, async (req, res) => {
  try {
    const blog = Blog.build({ ...req.body, userId: req.user });
    await blog.save();
  
    return res.status(200).json(blog);
    
  } catch (error) {
    console.log('catch bloack ran')
    console.log(error)
  }
});

blogRouter.delete('/:id', blogFinder, async (req, res) => {
    const userId = req.user;
    let blog = req.blog

    if (blog.userId === userId) {
      console.log('if block ran')
      blog = await Blog.destroy({ where: { id: blog.id } });
      res.status(200).json({"message": `Blog with an ID of ${req.params.id} has been deleted successfully.`});
    } else {
      res.status(401).send({ message: 'A user may only delete a blogs created by the user.' })
    }
});

module.exports = blogRouter;