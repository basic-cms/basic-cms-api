'use strict';

const server = require('../../src/server.js')
const {db} = require('./index')
const supertest = require('supertest')
const request = supertest(server.app)

beforeAll(async () => {
  await db.sync()
})

afterAll(async () => {
  await db.drop()
})

xdescribe('api server', () => {

  it('can add a post', async () => {
  });

})
