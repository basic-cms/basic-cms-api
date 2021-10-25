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

// WIP
xdescribe('post routes and post models', () => {

  it(' can GET all Posts if auth or non-auth', async () => {

  });
  it(' can POST one Post if is an auth-User Only', async () => {

  });
  it(' can POST one Post if is an auth-Writer Only', async () => {

  });
  it(' can POST one Post if is an auth-Editor Only', async () => {

  });
  it(' can POST one Post if is an auth-Admin Only', async () => {

  });

});
