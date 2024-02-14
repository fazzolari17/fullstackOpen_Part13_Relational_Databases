const loginRouter = require('express').Router();
const { User } = require('../models/index.js'); 
const bcrypt = require('bcryptjs');


// LOGIN
loginRouter.post('/login', async (req, res) => {
  try {
    
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      }
    })

    if (user.isDisabled) {
      res.status(401).send({ error: 'Your account has been disabled contact the site admin for further assistance.' });
    }
  
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword);
  
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password'
      })
    }

    req.session.user = { username: user.username, id: user.id };
  
    res.status(200).send({ message: `${user.name} has been successfully logged in.` });
  } catch (error) {
    console.error('CATCH: ', error)
  }
})

// LOGOUT
loginRouter.delete('/logout', async (req, res) => {
  if (req.session.user) {
    const { username } = req.session.user;
    req.session.destroy()
    res.status(200).send({ message: `${username} has been successfully logged out.`})
  } else {
    res.status(400).send({ error: 'User must be logged in to perform this action.' })
  }

  
})

module.exports = loginRouter;
