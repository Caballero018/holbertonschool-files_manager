const { promisify } = require('util');
const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient({
      host: 'localhost',
      port: 6379,
    });

    this.client.on('error', (error) => {
      console.error('Error en el cliente Redis:', error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  async set(key, value, seconds) {
    this.client.setex(key, seconds, value);
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
