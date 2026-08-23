const BaseRepository = require('./baseRepository');
const db = require('../models');

class SystemLogRepository extends BaseRepository {
  constructor() {
    super(db.SystemLog);
  }

  // Custom repository queries specific to System Logs
  async findRecentLogs(limit = 100) {
    return await this.model.findAll({
      order: [['sl_create_at', 'DESC']],
      limit: limit
    });
  }
}

module.exports = new SystemLogRepository();