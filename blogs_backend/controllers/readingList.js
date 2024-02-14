const readingListRouter = require('express').Router();
const { ReadingList } = require('../models/index.js');


readingListRouter.put('/:id', async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const blogToMarkAsRead = await ReadingList.findOne({
    where: { blogId: id }
  })

  if (blogToMarkAsRead['userId'] === user) {
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
  await itemAddedToReadingList.save();

  return res.status(200).json(itemAddedToReadingList);
})

module.exports = readingListRouter
