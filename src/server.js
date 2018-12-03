const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./controllers')
const applyMiddlewares = require('./middlewares')

module.exports = async function() {
  const app = new Koa()
  app.use(bodyParser())
  applyMiddlewares(app)
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)
  return app
}
