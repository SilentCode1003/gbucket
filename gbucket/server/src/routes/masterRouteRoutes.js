const express = require('express');
const router = express.Router();
const masterRouteController = require('../controllers/masterRouteController');

router.post('/', masterRouteController.createRoute);
router.get('/', masterRouteController.getAllRoutes);
router.get('/:id', masterRouteController.getRouteById);
router.put('/:id', masterRouteController.updateRoute);
router.delete('/:id', masterRouteController.deleteRoute);

module.exports = router;