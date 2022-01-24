const storageService = require('../services/StorageService');
const assert = require('../api/helpers/assert');

class ForeverCacheDecorator {
  constructor(decorated, storeKey) {
    assert(typeof decorated === 'object', '"decorated must be a object"');

    assert(typeof storeKey === 'string', '"storageKey must be a string"');

    this.decorated = decorated;

    this.storeKey = storeKey;
  }

  async handle(...args) {
    const exists = await storageService.has(this.storeKey);

    if (exists) {
      const data = await storageService.get(this.storeKey);

      return { data, cached: true };
    }

    const data = await this.decorated.handle(...args);

    if (data) {
      await storageService.set(this.storeKey, data);
    }

    return data;
  }
}

module.exports = ForeverCacheDecorator;
