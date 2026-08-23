const systemLogRepository = require('../repositories/systemLogRepository');

exports.createLog = async (req, res) => {
  try {
    const { sl_description } = req.body;

    const newLog = await systemLogRepository.create({
      sl_description,
      sl_create_at: new Date()
    });

    return res.status(201).json({ status: true, data: newLog });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await systemLogRepository.findAll();
    return res.status(200).json({ status: true, data: logs });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await systemLogRepository.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ status: false, message: 'Log not found' });
    }
    return res.status(200).json({ status: true, data: log });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateLog = async (req, res) => {
  try {
    const updatedLog = await systemLogRepository.update(req.params.id, req.body);
    if (!updatedLog) {
      return res.status(404).json({ status: false, message: 'Log not found' });
    }
    return res.status(200).json({ status: true, data: updatedLog });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const deleted = await systemLogRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Log not found' });
    }
    return res.status(200).json({ status: true, message: 'Log deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};