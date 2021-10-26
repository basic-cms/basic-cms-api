'use strict'

const supertest = require('supertest')
const { server } = require('./server')

const mockRequest = supertest(server)

describe('Given Server', () => {
  describe('When Server Starts', () => {
    it('Then should have \'/\' endpoint', async () => {
      const response = await mockRequest.get('/')
      expect(response.status).toStrictEqual(200)
      expect(response.text).toStrictEqual('Hello World!')
    })
    it('Then should have \'bad\' endpoint', async () => {
      const response = await mockRequest.get('/bad')
      expect(response.status).toStrictEqual(500)
    })
  })
})