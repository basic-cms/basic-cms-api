'use strict'

const express = require('express')
const authRouter = express.Router()

const { users } = require('../models/index')
const { basic } = require('../middleware/auth')

authRouter.post('/signup', async (req, res, next) => {
  try {
    res.status(201).json(await users.create(req.body))
  } catch (error) {
    next(error.message)
  }
})

authRouter.post('/signin', basic(users), async (req, res, next) => {
  try {
    const user = {
      username: req.user.username,
      token: req.user.token,
      id: req.user.id
    }
    res.status(200).json(user)
  } catch (error) {
    next(error.message)
  }
})

module.exports = authRouter
