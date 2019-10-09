
const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../App')

describe('GET /app', () => {
  it('should return an array of apps', () => {
    return supertest(app)
      .get('/app')
      .expect(200)
      .expect('Content-Type', /json/)
  })
});

describe('GET /app with params', () => {
  it('should return shortend list', () => {
    return supertest(app)
    .get('/app?sort=rating&genres=Action')
    .expect(200)
    .expect('Content-Type', /json/)
  });
});

describe('Should 404', () => {
  it('should not return a list', () => {
    return supertest(app)
    .get('/apps')
    .expect(404)
  });
});
