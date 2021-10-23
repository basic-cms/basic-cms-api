'use strict'

require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
// TODO: Enable when userSchema is ready
// const userSchema = require('./users')
// const postSchema = require('./posts')

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite:memory' 
  : process.env.DATABASE_URL

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' 
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  } : {}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG)

module.exports = {
  db: sequelize,
  // TODO: Enable when userSchema is ready
  // users: userSchema(sequelize, DataTypes),
  // posts: postSchema(sequelize, DataTypes)
}
