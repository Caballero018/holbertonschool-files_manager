require('dotenv').config();

module.exports = {
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
};
