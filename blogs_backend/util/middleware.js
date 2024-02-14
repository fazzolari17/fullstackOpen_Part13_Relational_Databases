const { Blog, User } = require('../models/index.js');
const logger = require('./logger.js');


const isAuthenticated = async (req, res, next) => {

  if (req.session.user) {
    const user = await User.findByPk(req.session.user.id)

    if (user.isDisabled) {
      req.session.destroy();
      res
        .status(401)
        .send({ error: 'Your account has been disabled contact the site admin for further assistance.' });
    } else if (!user.isDisabled) {
      next()
    }
  }

  req.session.destroy();
  res.status(401).send({ error: 'Session has ended user must login to continue.' })
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  
  if (!req.blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  return next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method);
  logger.info('Path', request.path);
  logger.info('Body', request.body);
  logger.info('Token', request.token);
  logger.info('User', request.user);
  logger.info('---');
  next();
};


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const blogChecker = (req, res, next) => {
  const { author, url, title } = req.body
  
  if (!author) {
    res.status(400).json({ error: 'Malformed Request author is required'})
  } else if (!url) {
    res.status(400).json({ error: 'Malformed Request url is required' });
  } else if (!title) {
    res.status(400).json({ error: 'Malformed Request title is required' });
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.name === 'SequelizeValidationError') {
    response.status(400).send({ error: error.errors[0].message });
  }

  next(error);
};

module.exports = {
  blogChecker,
  blogFinder,
  errorHandler,
  isAuthenticated,
  requestLogger,
  unknownEndpoint,
}