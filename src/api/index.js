const Koa = require('koa')
const cors = require('@koa/cors')
const app = new Koa()
const router = require('./controllers')
const bodyParser = require('koa-bodyparser')
const applyMiddlewares = require('./middlewares')

module.exports = function(port) {
  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  )
  app.use(bodyParser())
  applyMiddlewares(app)
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(port)
  return app
}
