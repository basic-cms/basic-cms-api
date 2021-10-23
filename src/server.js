'use strict'

// 3rd Party Resources
const express = require('express')

// Handlers and Routes
// const errorHandler = require('./error-handlers/500')
// const notFound = require('./error-handlers/404')
// const authRoutes = require('./routes/auth')

// Prepare the express app
const app = express()

// App Level Middleware
app.use(express.json())
// TODO: Enable if using form
// app.use(express.urlencoded({ extended: true }))

// Proof of life Route
app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!')
})

// Bad route
app.get('/bad', (req, res, next) => {
  next('you\'ve messed up')
})

// TODO: Enable when created - Routes 
// app.use(authRoutes)

// Use Handlers
// app.use(notFound)
// app.use(errorHandler)

// Export modules
module.exports = {
  server: app,
  start: port => app.listen(port, console.log(`Server started on Port ${port}`))
}
