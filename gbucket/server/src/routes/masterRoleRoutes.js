const express = require('express');
const router = express.Router();
const masterRoleController = require('../controllers/masterRoleController');

router.post('/', masterRoleController.createRole);
router.get('/', masterRoleController.getAllRoles);
router.get('/:id', masterRoleController.getRoleById);
router.put('/:id', masterRoleController.updateRole);
router.delete('/:id', masterRoleController.deleteRole);

module.exports = router;