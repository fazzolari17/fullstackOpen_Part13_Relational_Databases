// import { Blog } from '../models/index.js';
// const { JSON } = require('sequelize');
const { Blog } = require('../models/index.js');
const logger = require('./logger.js');

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

module.exports = {
  blogFinder,
  requestLogger,
  unknownEndpoint,
  blogChecker
}