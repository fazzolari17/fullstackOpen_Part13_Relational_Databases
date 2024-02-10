const bcrypt = require('bcryptjs');
const userRouter = require('express').Router();

const { User, Blog } = require('../models/index.js')

userRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });

  res.status(200).json(users)
})

userRouter.post('/', async (req, res, next) => {
  const existingUser = await User.findOne({ where: { username: req.body.username }})

  if (existingUser) {
    res.status(409).json({ error: 'User already exists log in instead' })
  } else if (!existingUser) {
    const user = await User.create(req.body)
    return res.status(201).send({ message: 'User created successfully', user })
  }
})

userRouter.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  
  console.log(user)
  if (user) {
    const original = user
    user.username = req.body.username
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter;