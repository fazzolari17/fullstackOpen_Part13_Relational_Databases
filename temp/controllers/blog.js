// import express from 'express';
// import { Blog } from '../models/index.js';
// import { blogFinder } from '../util/middleware.js';
const express = require('express');
const { Blog } = require('../models/index.js');
const { blogFinder, blogChecker } = require('../util/middleware.js');

const blogRouter = express.Router();

blogRouter.put('/:id', blogFinder, async (req, res) => {
  const { blog } = req;
  blog.likes + 1;
  await blog.save()

  res.status(200).json({ likes: blog.likes })
})

blogRouter.get('/:id', blogFinder, async (req, res) => {
  try {
    const { blog } = req;
    res.status(200).send(blog)
    
  } catch (error) {
    res.status(400).send({ error });
  }
})

blogRouter.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).send({ error });
  }
});

blogRouter.post('/', blogChecker, async (req, res) => {
  try {
    console.log('inside post')
    const blog = Blog.build(req.body);
    console.log(blog)
    await blog.save();
  
    return res.status(200).json(blog);
    
  } catch (error) {
    console.log('catch bloack ran')
    console.log(error)
  }
});

blogRouter.delete('/:id', blogFinder, async (req, res) => {
  try {
    let blog = req.blog
    blog = await Blog.destroy({ where: { id: blog.id } });

    res.status(200).json({"message": `Blog with an ID of ${id} has been deleted successfully.`});
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = blogRouter;