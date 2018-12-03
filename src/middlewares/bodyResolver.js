module.exports = async function bodyResolver(ctx, next) {
  const data = await next()
  ctx.body = ctx.body || data
}
