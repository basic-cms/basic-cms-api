'use strict'

const supertest = require('supertest')
const { db, users } = require('../models/index')
const { server } = require('../server')
const request = supertest(server)

beforeAll(async () => {
  await db.sync()
  await users.bulkCreate([
    {
      id: 23,
      username: 'TEST',
      password: '$2a$10$fYHN0Tgp3SqUlOclOaL/TucaNVLyz6JKS29KTTYbbjcu4iQPyiQgC',
      role: 'admin',
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    },
    {
      id: 24,
      username: 'Second TEST',
      password: '$2a$10$hv8o1dqDU.fXHAlHYy1EU.JXNRLNfRR66KoPYF/Ck4U2ulhYFsxPq',
      role: 'user',
      updatedAt: new Date('2021-10-25'),
      createdAt: new Date('2021-10-25')
    }
  ])
})

afterAll(async () => {
  await db.drop()
})

describe('Given GET to /user, authed-user', () => {
  it('can retrieve users own record', async () => {
    let user = await users.findOne({ where: { id: 23} })
    const response = await request.get('/user').send(user).set('Authorization', `Bearer ${user.token}`)
    expect(response.status).toStrictEqual(200)
    expect(response.body).toHaveProperty('id', 23)
    expect(response.body).toHaveProperty('username', 'TEST')
    expect(response.body).toHaveProperty('password', '$2a$10$fYHN0Tgp3SqUlOclOaL/TucaNVLyz6JKS29KTTYbbjcu4iQPyiQgC')
    expect(response.body).toHaveProperty('role', 'admin')
    expect(response.body).toHaveProperty('capabilities', [ 'read', 'create', 'update', 'delete' ] )
    expect(response.body.token).toBeTruthy()
  })
})
describe('Given GET to /users, admin-user', () => {
  it('can retrieve a list of all persisted user names', async () => {
    let user = await users.findOne({ where: { id: 23 } })
    const response = await request.get('/users').set('Authorization', `Bearer ${user.token}`)
    expect(response.status).toStrictEqual(200)
    expect(response.body).toStrictEqual(['TEST','Second TEST'])
  })
} )
describe('Given DEL to /user, admin-user', () => {
  it('can destroy a user', async () => {
    let user = await users.findOne({  where:{ id: 23 } })
    let mockRequestBody = {
      username: 'Second TEST'
    }
    const response = await request.delete('/user').send(mockRequestBody).set('Authorization', `Bearer ${user.token}`)
    console.log(response)
    expect(response.status).toStrictEqual(200)
  })
})
