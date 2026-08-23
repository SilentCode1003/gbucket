const masterUserRepository = require('../repositories/masterUserRepository');

exports.createUser = async (req, res) => {
  try {
    const { mu_fullname, mu_username, mu_password, mu_role, mu_is_active, mu_create_by } = req.body;

    const newUser = await masterUserRepository.create({
      mu_fullname,
      mu_username,
      mu_password, // Remind to hash passwords using bcrypt before saving!
      mu_role,
      mu_is_active,
      mu_create_by,
      mu_create_at: new Date()
    });

    return res.status(201).json({ status: true, data: newUser });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await masterUserRepository.findAll();
    return res.status(200).json({ status: true, data: users });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await masterUserRepository.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await masterUserRepository.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    return res.status(200).json({ status: true, data: updatedUser });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await masterUserRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    return res.status(200).json({ status: true, message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};