'use strict'

const supertest = require('supertest')
const { db, posts, users } = require('../models')
const server = require('../server')
const { bearer } = require('../middleware/auth')
const mockRequest = supertest(server.server)

beforeAll(async () => {
  await db.sync()
  // Create Users
  await users.bulkCreate([
    {
      id: 0,
      username: 'Jayson.Deckow77@test.com',
      password: '$2a$10$3cKT1o6gUqMKoPNggJyTce7Algx36J3U9fCt7IbsYEPdEFM.Wns/i',
      role: 'admin',
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    }
  ])
  // Create Posts
  await posts.bulkCreate([
    {
      id: 0,
      title: 'Test Please Ignore',
      body: 'This is a test post please ignore',
      user_id: 0,
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    },
    {
      id: 1,
      title: 'Test Post #2',
      body: 'Also a Test',
      user_id: 0,
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    },
    {
      id: 2,
      title: 'Test Post #3',
      body: 'Another Test Post',
      user_id: 1,
      createdAt: new Date('2021-10-23'),
      updatedAt: new Date('2021-10-24'),
    }
  ])
})

afterAll(async () => {
  await db.drop()
})

describe('Given GET', () => {
  describe(`When '/posts'`, () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/posts')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual([
        {
          id: 0,
          title: 'Test Please Ignore',
          user_id: 0,
          body: 'This is a test post please ignore',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        },
        {
          id: 1,
          title: 'Test Post #2',
          user_id: 0,
          body: 'Also a Test',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        },
        {
          id: 2,
          title: 'Test Post #3',
          user_id: 1,
          body: 'Another Test Post',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        }
      ])
    })
  })
  describe(`When '/post/:id'`, () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get( '/post/1')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(
        {
          id: 1,
          title: 'Test Post #2',
          user_id: 0,
          body: 'Also a Test',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        }
      )
    })
  })
  describe(`When '/post/:user_id'`, () => {
    it('Then returns correct response body & status', async () => {
      const response = await mockRequest.get('/posts/0')
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual([
        {
          id: 0,
          title: 'Test Please Ignore',
          user_id: 0,
          body: 'This is a test post please ignore',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        },
        {
          id: 1,
          title: 'Test Post #2',
          user_id: 0,
          body: 'Also a Test',
          createdAt: '2021-10-23T00:00:00.000Z',
          updatedAt: '2021-10-24T00:00:00.000Z'
        }
      ])
    })
  })
})

describe('Given POST', () => {
  describe(`When '/post'`, () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        title: 'Sample Title',
        body: 'Sample Body',
      }
      let user = await users.findOne({where: { id: 0 } })
      const response = await mockRequest.post('/post').send(requestBody).set('Authorization', `Bearer ${user.token}`)
      expect(response.status).toStrictEqual(200)
      expect(response.body.title).toStrictEqual('Sample Title')
      expect(response.body.body).toStrictEqual('Sample Body')
      expect(response.body.user_id).toStrictEqual(0)
    })
  })
})

describe('Given PUT', () => {
  describe(`When '/post/:id'`, () => {
    it('Then returns correct response body & status', async () => {
      const requestBody = {
        title: 'Sample Changed Title',
        body: 'Sample Changed Body',
      }
      let user = await users.findOne({where: { id: 0 } })
      const response = await mockRequest.put('/post/0').send(requestBody).set('Authorization', `Bearer ${user.token}`)
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual([1])
    })
  })
})

describe('Given DELETE', () => {
  describe(`When '/post/:id`, () => {
    it('Then returns correct response body & status', async () => {
      let user = await users.findOne({where: { id: 0 } })
      const response = await mockRequest.delete('/post/0').set('Authorization', `Bearer ${user.token}`)
      expect(response.status).toStrictEqual(200)
      expect(response.body).toStrictEqual(1)
    })
  })
})