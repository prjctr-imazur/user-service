const storageService = require('../services/StorageService');
const assert = require('../api/helpers/assert');

class RemoveCacheDecorator {
  constructor(decorated, storeKey) {
    assert(typeof decorated === 'object', '"decorated must be a object"');

    assert(typeof storeKey === 'string', '"storageKey must be a string"');

    this.decorated = decorated;

    this.storeKey = storeKey;
  }

  async handle(...args) {
    const exists = await storageService.has(this.storeKey);

    if (exists) {
      storageService.delete(this.storeKey);
    }

    return this.decorated.handle(...args);
  }
}

module.exports = RemoveCacheDecorator;
