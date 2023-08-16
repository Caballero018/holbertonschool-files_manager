/* eslint-disable import/prefer-default-export */
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error('Error en el cliente Redis:', error);
    });
  }

  isAlive() {
    this.client.ping((error, reply) => {
      if (reply === 'PONG') return true;

      return false;
    });
  }

  async get(key) {
    this.client.get(key, (error, value) => value);
  }

  async set(key, value, seconds) {
    this.client.setex(key, seconds, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

export const redisClient = new RedisClient();
