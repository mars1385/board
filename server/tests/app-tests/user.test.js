// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');
const { dbDisconnect, dbConnection } = require('../../config/db');
const factorys = require('../factory/Factorys');
const User = require('../../model/User');
// -----------------end-------------------

const request = supertest(app);

describe('testing authentication', () => {
  beforeAll(async () => {
    await dbConnection(process.env.DATA_BASE_TEST);
  });
  afterAll(async () => {
    await User.deleteMany();
    await dbDisconnect();
  });

  it('register should contain name', async () => {
    const user = factorys.build('userFactory', { name: null });
    let userResponse = await request.post('/auth/register').send(user);

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({ field: 'name', message: 'Please add a name' });
  });

  it('register should contain email', async () => {
    const user = factorys.build('userFactory', { email: null });
    let userResponse = await request.post('/auth/register').send(user);

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({ field: 'email', message: 'Please add an email' });
  });

  it('register should contain password', async () => {
    const user = factorys.build('userFactory', { password: null });
    let userResponse = await request.post('/auth/register').send(user);

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({ field: 'password', message: 'Please add a password' });
  });

  it('a user can register', async () => {
    const user = factorys.build('userFactory');
    let userResponse = await request.post('/auth/register').send(user);

    expect(userResponse.status).toBe(200);
    expect(userResponse.body.success).toBe(true);
  });

  it('a user can not register  with already register email', async () => {
    const user = factorys.build('userFactory');
    await User.create(user);
    const newUser = factorys.build('userFactory', { email: user.email });
    let userResponse = await request.post('/auth/register').send(newUser);

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({
      field: 'email',
      message: 'There is user with this email',
    });
  });

  it('login should contain password', async () => {
    const { password } = factorys.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ password });

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({
      field: 'login',
      message: 'Please provide an email and password',
    });
  });

  it('login should contain email', async () => {
    const { email } = factorys.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ email });

    expect(userResponse.status).toBe(400);
    expect(userResponse.body.error).toContainEqual({
      field: 'login',
      message: 'Please provide an email and password',
    });
  });

  it('user with this email must be register', async () => {
    const { email, password } = factorys.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ email, password });

    expect(userResponse.status).toBe(401);
    expect(userResponse.body.error).toContainEqual({
      field: 'login',
      message: 'Email Or Password is Wrong',
    });
  });

  it('entered password must be match with user password', async () => {
    const { email, password, name } = factorys.build('userFactory');
    await request.post('/auth/register').send({ email, password, name });
    let userResponse = await request.post('/auth/login').send({ email, password: 'qwesdde112' });

    expect(userResponse.status).toBe(401);
    expect(userResponse.body.error).toContainEqual({
      field: 'login',
      message: 'Email Or Password is Wrong',
    });
  });

  it('a user can login', async () => {
    const { email, password, name } = factorys.build('userFactory');
    await request.post('/auth/register').send({ email, password, name });
    let userResponse = await request.post('/auth/login').send({ email, password });

    expect(userResponse.status).toBe(200);
    expect(userResponse.body.success).toBe(true);
  });

  it('guest can not see a user info', async () => {
    const user = await request.get('/auth/userInfo');

    expect(user.status).toBe(401);
    expect(user.body.error).toContainEqual({
      field: 'auth',
      message: 'Not authorized to access this route',
    });
  });

  it('a user can get his info', async () => {
    const { email, password, name } = factorys.build('userFactory');
    const { body } = await request.post('/auth/register').send({ email, password, name });
    const user = await request.get('/auth/userInfo').set('authorization', `Bearer ${body.token}`);

    expect(user.status).toBe(200);
    expect(user.body).toEqual({ name, email });
  });
});
