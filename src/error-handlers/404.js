'use strict'

module.exports = (req,res,next) => {
  res.status(404).send({
    error: 404,
    message: '404: Not Found'
  })
  next()
}
