const express = require('express');
const router = express.Router();
const masterTokenController = require('../controllers/masterTokenController');

router.post('/', masterTokenController.createToken);
router.get('/', masterTokenController.getAllTokens);
router.get('/:id', masterTokenController.getTokenById);
router.put('/:id', masterTokenController.updateToken);
router.delete('/:id', masterTokenController.deleteToken);

module.exports = router;