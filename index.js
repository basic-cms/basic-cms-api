'use strict'

require('dotenv').config

const server = require('./src/server')
const { db } = require('./src/models/index.js')

db.sync()
  .then(() => {
    server.start(process.env.PORT || 3001)
  })
  .catch(console.error)
