const { Sequelize } = require('sequelize');
// import { DOCKER_DATABASE_URL } from './config.js';
const { DOCKER_DATABASE_URL } = require('./config.js')

const sequelize = new Sequelize(DOCKER_DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to the database.')
  } catch (error) {
    console.log('Failed to connect to the database.')
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDatabase,
  sequelize
}