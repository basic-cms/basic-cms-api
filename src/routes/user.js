'use strict'

const express = require('express')
const userRouter = express.Router()

const { users } = require('../models/index')
const { acl, bearer } = require('../middleware/auth')

// GET User - User Reads 
userRouter.get('/user', bearer(users), async(req, res, next) => {
  const user = await users.findOne({ where: {username: req.user.username}})
  res.status(200).json(user)
})

// GET All Users - Admin Only
userRouter.get('/users', bearer(users), acl('delete'), async(req, res, next) => {
  const foundUsers = await users.findAll()
  const list = foundUsers.map(user => user.username)
  res.status(200).json(list)
})

// DELETE User - Admin Only
userRouter.delete('/user', bearer(users), acl('delete'), async(req, res, next) => {
  const deletedUser = await users.destroy({ where: { username: req.body.username } })
  res.status(200).json(deletedUser)
})

module.exports = userRouter
