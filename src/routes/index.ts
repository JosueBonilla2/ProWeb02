import express from 'express'
import CategoryRouter from './category.route'
import UserRouter from './user.router'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', CategoryRouter)
  router.use('/users', UserRouter)
}

export default routerApi