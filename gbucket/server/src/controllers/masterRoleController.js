const masterRoleRepository = require('../repositories/masterRoleRepository');

exports.createRole = async (req, res) => {
  try {
    const { mr_name, mr_create_by } = req.body;
    const newRole = await masterRoleRepository.create({
      mr_name,
      mr_create_by,
      mr_create_at: new Date()
    });
    return res.status(201).json({ status: true, data: newRole });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await masterRoleRepository.findAll();
    return res.status(200).json({ status: true, data: roles });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await masterRoleRepository.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ status: false, message: 'Role not found' });
    }
    return res.status(200).json({ status: true, data: role });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await masterRoleRepository.update(req.params.id, req.body);
    if (!updatedRole) {
      return res.status(404).json({ status: false, message: 'Role not found' });
    }
    return res.status(200).json({ status: true, data: updatedRole });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const deleted = await masterRoleRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Role not found' });
    }
    return res.status(200).json({ status: true, message: 'Role deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};