'use strict'

const { server } = require('../server')
const supertest = require('supertest')
const request = supertest(server);

describe( '500 Error Handling ', () => {

  it( ' can return 500 on a bad route ', async () => {
    const response = await request.get('/bad')
    console.log(response)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Something broke')
  })
})
