const BaseRepository = require('./baseRepository');
const db = require('../models');

class MasterRoleRepository extends BaseRepository {
  constructor() {
    super(db.MasterRole);
  }

  get model() {
    return db.MasterRole;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async update(id, data) {
    const route = await this.model.findByPk(id);
    if (!route) return null;
    return await route.update(data);
  }

  async delete(id) {
    const route = await this.model.findByPk(id);
    if (!route) return null;
    await route.destroy();
    return true;
  }
}

module.exports = new MasterRoleRepository();