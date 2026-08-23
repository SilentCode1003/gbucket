const masterTokenRepository = require('../repositories/masterTokenRepository');

exports.createToken = async (req, res) => {
  try {
    const { mt_web_service, mt_token, my_create_by } = req.body;

    const newToken = await masterTokenRepository.create({
      mt_web_service,
      mt_token,
      my_create_by,
      my_created_at: new Date()
    });

    return res.status(201).json({ status: true, data: newToken });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllTokens = async (req, res) => {
  try {
    const tokens = await masterTokenRepository.findAll();
    return res.status(200).json({ status: true, data: tokens });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getTokenById = async (req, res) => {
  try {
    const token = await masterTokenRepository.findById(req.params.id);
    if (!token) {
      return res.status(404).json({ status: false, message: 'Token not found' });
    }
    return res.status(200).json({ status: true, data: token });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateToken = async (req, res) => {
  try {
    const updatedToken = await masterTokenRepository.update(req.params.id, req.body);
    if (!updatedToken) {
      return res.status(404).json({ status: false, message: 'Token not found' });
    }
    return res.status(200).json({ status: true, data: updatedToken });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteToken = async (req, res) => {
  try {
    const deleted = await masterTokenRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Token not found' });
    }
    return res.status(200).json({ status: true, message: 'Token deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};