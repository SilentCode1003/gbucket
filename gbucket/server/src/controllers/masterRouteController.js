const masterRouteRepository = require('../repositories/masterRouteRepository');

exports.createRoute = async (req, res) => {
  try {
    const { mr_route, mr_route_name, mr_create_by } = req.body;
    const newRoute = await masterRouteRepository.create({
      mr_route,
      mr_route_name,
      mr_create_by,
      mr_create_at: new Date()
    });
    return res.status(201).json({ status: true, data: newRoute });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await masterRouteRepository.findAll();
    return res.status(200).json({ status: true, data: routes });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.getRouteById = async (req, res) => {
  try {
    const route = await masterRouteRepository.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ status: false, message: 'Route not found' });
    }
    return res.status(200).json({ status: true, data: route });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateRoute = async (req, res) => {
  try {
    const updatedRoute = await masterRouteRepository.update(req.params.id, req.body);
    if (!updatedRoute) {
      return res.status(404).json({ status: false, message: 'Route not found' });
    }
    return res.status(200).json({ status: true, data: updatedRoute });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteRoute = async (req, res) => {
  try {
    const deleted = await masterRouteRepository.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Route not found' });
    }
    return res.status(200).json({ status: true, message: 'Route deleted successfully' });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};