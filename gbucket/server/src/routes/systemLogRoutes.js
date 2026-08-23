const express = require('express');
const router = express.Router();
const systemLogController = require('../controllers/systemLogController');

router.post('/', systemLogController.createLog);
router.get('/', systemLogController.getAllLogs);
router.get('/:id', systemLogController.getLogById);
router.put('/:id', systemLogController.updateLog);
router.delete('/:id', systemLogController.deleteLog);

module.exports = router;