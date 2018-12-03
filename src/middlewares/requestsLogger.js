let globalRequestId = -1

module.exports = async function requestsLogger(ctx, next) {
  const requestId = ++globalRequestId
  const requestString = `Request ${requestId}`

  console.time(requestString)
  const rez = await next()
  console.timeEnd(requestString)
  return rez
}
