require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: 'basic-cms-api',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'username',
    password: 'password',
    database: 'basic-cms-api',
    host: '127.0.0.1',
    dialect: 'sqlite:memory:'
  },
  production: {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false,
      }
    }
  }
}
