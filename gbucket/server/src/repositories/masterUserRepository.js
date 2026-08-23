const BaseRepository = require('./baseRepository');

class MasterUserRepository extends BaseRepository {
  constructor() {
    // Pass ONLY the model name string. BaseRepository handles loading db lazily.
    super('MasterUser'); 
  }

  async findByUsername(username) {
    return await this.model.findOne({ where: { mu_username: username } });
  }
}

module.exports = new MasterUserRepository();