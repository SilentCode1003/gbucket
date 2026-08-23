const BaseRepository = require('./baseRepository');
const db = require('../models');

class MasterTokenRepository extends BaseRepository {
  constructor() {
    super(db.MasterToken);
  }

  // Custom queries specific to MasterToken
  async findByWebService(webService) {
    return await this.model.findOne({ where: { mt_web_service: webService } });
  }
}

module.exports = new MasterTokenRepository();