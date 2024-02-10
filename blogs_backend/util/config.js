const dotenv = require('dotenv');
dotenv.config()

module.exports = {
  DOCKER_DATABASE_URL: process.env.DOCKER_DATABASE_URL,
  DATABASE_URL_MAIN: process.env.DATABASE_URL_MAIN,
  PORT: process.env.PORT || 3005,
  SECRET: process.env.SECRET,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
};