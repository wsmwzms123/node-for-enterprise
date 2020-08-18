const express = require('express')
const { resolve } = require('path')
const { promisify } = require('util')
const initMiddlewares = require('./middlewares')
const initControllers = require('./controllers')
const logger = require('./utils/logger')

const server = express()
const port = parseInt(process.env.PORT || 9000)
const publicDir = resolve('public')
const mouldsDir = resolve('src/moulds')

async function bootstrap () {
  server.use(await initMiddlewares())
  server.use(express.static(publicDir))
  server.use('/moulds', express.static(mouldsDir))
  server.use(await initControllers())
  server.use(errorHandler)
  await promisify(server.listen.bind(server, port))()
  logger.info(`> Started on port ${port}`)
}

process.on('unhandledRejection', err => {
  logger.fatal(err)
  // eslint-disable-next-line no-process-exit
  process.exit(1)
})

process.on('uncaughtException', (err) => {
  logger.fatal(err)
  process.exit(1)
})

function errorHandler (err, req, res, next) {
  if (res.headersSend) {
    // 如果是在返回响应结果时发生了异常，
    // 那么交给 express 内置的 finalhandler 关闭链接
    return next(err)
  }

  req.logger.error(err)
  res.redirect('/500.html')
}

bootstrap()
