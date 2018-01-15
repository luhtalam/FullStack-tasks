const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
app.use(middleware.tokenExtractor)

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)
const PORT = config.port

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.on('close', () => {
  mongoose.disconnect()
})

module.exports = {
  app, server
}