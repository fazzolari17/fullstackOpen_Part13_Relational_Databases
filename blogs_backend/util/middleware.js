const { Blog } = require('../models/index.js');
const logger = require('./logger.js');
const { SECRET } = require('./config.js');
const jwt = require('jsonwebtoken');

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

const userExtractor = (
  request,
  response,
  next,
) => {
  console.log('EXTRACTOR TOKEN:', request.token)
  const decodedToken = jwt.verify(request.token, SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else {
    request.user = decodedToken.id;
  }

  return next();
};

const tokenExtractor = (
  request,
  _response,
  next,
) => {
  console.log('tokenExtractor')
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

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
  logger.error(error.messsage);

  if (error.name === 'SequelizeValidationError') {
    response.status(400).send({ error: error.errors[0].message });
  }
  // if (error.name === 'CastError') {
  //   return response.status(400).send({
  //     error: 'malformatted id',
  //   });
  // } else if (error.name === 'ValidationError') {
  //   console.log('VALIDATION ERROR!!!')
  //   return response.status(400).json({
  //     error: error.message,
  //   });
  // } else if (error.name === 'JsonWebTokenError') {
  //   return response.status(401).json({
  //     error: 'invalid token',
  //   });
  // } else if (error.name === 'TokenExpiredError') {
  //   return response.status(401).json({
  //     error: 'token expired',
  //   });
  // }

  next(error);
};

module.exports = {
  blogFinder,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  blogChecker,
  tokenExtractor,
  userExtractor
}