const express = require('express');
const router = express.Router();
const masterUserController = require('../controllers/masterUserController');

router.post('/', masterUserController.createUser);
router.get('/', masterUserController.getAllUsers);
router.get('/:id', masterUserController.getUserById);
router.put('/:id', masterUserController.updateUser);
router.delete('/:id', masterUserController.deleteUser);

module.exports = router;