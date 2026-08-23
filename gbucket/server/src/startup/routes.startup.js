const { auth } = require('../middlewares/auth.middleware')
const { healthRouter } = require('../routes/health.routes')
const MasterRolerouter = require('../routes/masterRoleRoutes')
const MasterRouteRouter = require('../routes/masterRouteRoutes')
const MasterUserRouter = require('../routes/masterUserRoutes')
const MasterTokenRouter = require('../routes/masterTokenRoutes')
const FileRouter = require('../routes/fileRoutes')
const SystemLogRouter = require('../routes/systemLogRoutes')
const authRoutes = require('../routes/authRoutes');



const initRoutes = (app) => {
  app.use('/health', healthRouter)
  app.use('/auth', authRoutes);
  //app.use(auth)
  app.use('/master-roles', MasterRolerouter)
  app.use('/master-routes', MasterRouteRouter)
  app.use('/master-users', MasterUserRouter)
  app.use('/master-tokens', MasterTokenRouter)
  app.use('/api/v1/files', FileRouter)
  app.use('/system-logs', SystemLogRouter)

}


module.exports = { initRoutes }
