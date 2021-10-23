'use strict'

require('dotenv').config

const server = require('./src/server')

// TODO: Remove when db added
server.start(process.env.PORT || 3001)

// TODO: Enable when models present Contains All Models
// const { db } = require('./src/models/index.js')

// db.sync()
//   .then(() => {
//     server.start(process.env.PORT || 3001);
//   })
//   .catch(console.error);