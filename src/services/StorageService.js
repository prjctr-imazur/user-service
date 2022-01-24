const Redis = require('ioredis');

const configService = require('./ConfigService');

class StorageService {
  redis;

  constructor() {
    this.redis = new Redis(configService.redis);
  }

  async has(key) {
    const size = await this.redis.exists(key);

    return size > 0;
  }

  async get(key) {
    const result = await this.redis.get(key);

    return typeof result === 'string' ? JSON.parse(result) : result;
  }

  async set(key, value) {
    return typeof value === 'string'
      ? this.redis.set(key, value)
      : this.redis.set(key, JSON.stringify(value));
  }

  async delete(...key) {
    return this.redis.del(...key);
  }
}

const storageService = (function loadStorageService() {
  return new StorageService();
  // eslint-disable-next-line prettier/prettier
}());

module.exports = storageService;
