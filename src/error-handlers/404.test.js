'use strict'

const { server } = require('../server')
const supertest = require('supertest')
const request = supertest(server)

describe( 'Error Handling ', () => {
  it( ' can 404 on a bad route ', async () => {
    const response = await request.get('/foo')
    expect(response.status).toBe(404)
  })
  it( ' can 404 on a bad HTTP method ', async () => {
    const response = await request.patch('/post')
    expect(response.status).toBe(404)
  })
})
