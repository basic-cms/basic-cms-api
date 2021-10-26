'use strict'

const base64 = require('base-64')

const acl = (capability) => (req, res, next)=> {
  try {
    req.user.capabilities.includes(capability) 
      ? next()
      : next('Access Denied')
  } catch (e) {
    next('Invalid Login')
  }
}

const basic = (users) => async(req, res, next) => {
  try {
    if (!req.headers.authorization) { throw new Error('Auth Error') }
    let basic = req.headers.authorization.split(' ')[1]
    let [ username, pass ] = base64.decode(basic).split(':')
    req.user = await users.authenticateBasic(username, pass)
  } catch (e) {
    res.status(403).send('Invalid Login')
  } finally {
    next()
  }
}

const bearer = (users) => async(req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login') }
    const token = req.headers.authorization.split(' ').pop()
    const validUser = await users.authenticateToken(token)
    req.user = validUser
    req.token = validUser.token
  } catch (e) {
    res.status(403).send('Invalid Login')
  } finally {
    next()
  }
}

module.exports = {
  acl: acl,
  basic: basic,
  bearer: bearer
}
