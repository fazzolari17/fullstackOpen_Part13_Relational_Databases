const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();

const { SECRET } = require('../util/config.js');
const { User } = require('../models/index.js'); 

loginRouter.post('/', async (req, res) => {

  try {
    
    const { username, password }= req.body;
    console.log('USER NAME:', username)
  
    const user = await User.findOne({
      where: {
        username: username
      }
    })
  
  
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword);
  
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user.id
    }
  
    const token = jwt.sign(userForToken, SECRET);
  
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    console.error('CATCH: ', error)
  }
})

module.exports = loginRouter;
