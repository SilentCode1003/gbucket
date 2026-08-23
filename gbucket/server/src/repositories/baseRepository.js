const db = require('../models');

class BaseRepository {
  /**
   * Accepts either:
   * 1. A string model name (e.g., 'MasterUser') -> resolves lazily from db context
   * 2. A direct Sequelize model instance -> backward compatible
   */
  constructor(modelOrName) {
    if (typeof modelOrName === 'string') {
      this.modelName = modelOrName;
      this.internalModel = null;
    } else {
      this.internalModel = modelOrName;
      this.modelName = modelOrName?.name;
    }
  }

  /**
   * Safely resolves the Sequelize model at execution time rather than require time.
   */
  get model() {
    // 1. Resolve lazily by string name from db
    if (this.modelName && db[this.modelName]) {
      return db[this.modelName];
    }

    // 2. Fallback to directly provided model instance
    if (this.internalModel) {
      return this.internalModel;
    }

    // 3. Clear, diagnostic error message if lookup fails
    const availableModels = Object.keys(db).length ? Object.keys(db).join(', ') : 'None loaded';
    throw new Error(
      `[BaseRepository] Model '${this.modelName || 'Unknown'}' is undefined on 'db'. ` +
      `Available keys: [${availableModels}]. Check models/index.js exports.`
    );
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id, options = {}) {
    if (id == null) return null;
    return await this.model.findByPk(id, options);
  }

  async findOne(options = {}) {
    return await this.model.findOne(options);
  }

  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  /**
   * Updates a record by primary key.
   */
  async update(id, data, options = {}) {
    if (id == null) return null;

    // Isolate transaction/scope options for primary key lookup
    const findOptions = options.transaction ? { transaction: options.transaction } : {};
    const record = await this.findById(id, findOptions);
    
    if (!record) return null;

    return await record.update(data, options);
  }

  /**
   * Deletes a record by primary key.
   */
  async delete(id, options = {}) {
    if (id == null) return false;

    // Isolate transaction/scope options for primary key lookup
    const findOptions = options.transaction ? { transaction: options.transaction } : {};
    const record = await this.findById(id, findOptions);
    
    if (!record) return false;

    await record.destroy(options);
    return true;
  }

  /**
   * Helper for paginated results
   */
  async findAndCountAll(options = {}) {
    return await this.model.findAndCountAll(options);
  }
}

module.exports = BaseRepository;