const express = require('express')
require('express-async-errors')
const history = require('connect-history-api-fallback')
const app = express()

const { createServer } = require('@promster/server')
const prometheusMiddleware = require('./middleware/actuator')
const logger = require('./middleware/logger')
const healthcheck = require('./middleware/healthcheck')
const content = require('./middleware/content')
const errorHandler = require('./middleware/errorHandler')

app.use(prometheusMiddleware(app))
app.use(logger())

app.use('/health', healthcheck)
app.use('/api/content', content)

const staticFileMiddleware = express.static('public/dist')
app.use(history())
app.use(staticFileMiddleware)

app.use(errorHandler)

const serverPort = 8080
app.listen(serverPort, () => {
  console.log(`Node server listening at port ${serverPort}`)
})

const prometheusPort = 9095
createServer({ port: prometheusPort }).then(() =>
  console.log(`@promster/server started on port ${prometheusPort}`))