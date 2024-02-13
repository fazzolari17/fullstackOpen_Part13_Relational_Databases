const express = require('express');
const { Blog, User, ReadingList } = require('../models/index.js');
const { blogFinder, blogChecker } = require('../util/middleware.js');
const { Op } = require('sequelize');

const readingListRouter = express.Router();

readingListRouter.put('/:id', async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const blogToMarkAsRead = await ReadingList.findOne({
    where: { blogId: id }
  })

  if (blogToMarkAsRead['userId'] === user) {
    console.log('INDISE IF ')
    blogToMarkAsRead.read = req.body.read
    blogToMarkAsRead.save()
  } else if (blogToMarkAsRead['userId'] !== user) {
    res.status(401).send({ error: 'Users are only allowed to update blogs in their reading list'})
  }
    res.status(200).send(blogToMarkAsRead);
})

readingListRouter.post('/', async (req, res) => {
  const { user, body } = req;
  const itemAddedToReadingList = ReadingList.build({ ...body, userId: user });
  console.log('ITEM ADDED:', itemAddedToReadingList)
  await itemAddedToReadingList.save();

  return res.status(200).json(itemAddedToReadingList);
})

module.exports = readingListRouter
