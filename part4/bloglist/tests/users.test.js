const request = require('supertest');
const { test, describe, before } = require('node:test');
const assert = require('node:assert');
const app = require('../index');
const User = require('../models/user');

describe('User API', () => {
  before(async () => {
    await User.deleteMany({});
  });

  test('POST /api/users should create a new user with valid data', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.username, newUser.username);
  });

  test('POST /api/users should not create a user with a short username', async () => {
    const newUser = {
      username: 'us',
      password: 'password123',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long');
  });

  test('POST /api/users should not create a user with a short password', async () => {
    const newUser = {
      username: 'testuser',
      password: 'pw',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.error, 'Username and password must be at least 3 characters long');
  });

  test('POST /api/users should not create a user with a duplicate username', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
      name: 'Test User',
    };
  
    // Tworzenie użytkownika
    await request(app).post('/api/users').send(newUser).expect(201);
  
    // Próba utworzenia użytkownika z tym samym username
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
  
    // Sprawdzenie, czy odpowiedź ma status 400
    assert.strictEqual(response.status, 400);
    // Sprawdzenie, czy komunikat o błędzie jest poprawny
    assert.strictEqual(response.body.error, 'Username must be unique');
  });
  
});