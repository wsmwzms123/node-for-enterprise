const { Router } = require('express')
const urlNormalizeMiddleware = require('./url-normalize.js')

module.exports = async function initMiddlewares () {
  const router = Router()
  router.use(urlNormalizeMiddleware())
  return router
}
