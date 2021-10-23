'use strict';

const server = require('../../src/server.js');
const {db} = require('./index');
const supertest = require('supertest');
const request = supertest(server.app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

xdescribe('api server', () => {

  it('can add a user', async () => {
    const response = await request.post('/user').send({
      firstName: 'user first name',
      lastName: 'user last name',
      role: 'user',
    })

    expect(response.status).toEqual(200);
    expect(response.body.firstName).toEqual('user first name');
    expect(response.body.lastName).toEqual('user last name');
    expect(response.body.role).toEqual('user');

  });

});
