'use strict'

const { server } = require('../server')
const supertest = require('supertest')
const mockRequest = supertest(server)

describe('500 Error Handling', () => {
  it('can return 500 on a bad route', async () => {
    const response = await mockRequest.get('/bad')
    expect(response.status).toBe(500)
    expect(response.text).toBe('Something broke')
  })
})
