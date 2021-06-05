// -----------------imports-----------------
const app = require('../../app');
const supertest = require('supertest');

const factory = require('../../test/factory/Factory');
const User = require('../../model/User');
// -----------------end-------------------

const request = supertest(app);

describe('testing authentication', () => {
  it('register should contain name', async () => {
    const user = factory.build('userFactory', { name: null });
    let userResponse = await request.post('/auth/register').send(user).expect(400);

    expect(userResponse.body.errors).toContainEqual({ field: 'name', message: 'Please add a name' });
  });

  it('register should contain email', async () => {
    const user = factory.build('userFactory', { email: null });
    let userResponse = await request.post('/auth/register').send(user).expect(400);

    expect(userResponse.body.errors).toContainEqual({ field: 'email', message: 'Please add an email' });
  });

  it('register should contain password', async () => {
    const user = factory.build('userFactory', { password: null });
    let userResponse = await request.post('/auth/register').send(user).expect(400);

    expect(userResponse.body.errors).toContainEqual({ field: 'password', message: 'Please add a password' });
  });

  it('a user can register', async () => {
    const user = factory.build('userFactory');
    let userResponse = await request.post('/auth/register').send(user).expect(200);

    expect(userResponse.body.success).toBe(true);
  });

  it('a user can not register  with already register email', async () => {
    const user = factory.build('userFactory');
    await User.create(user);
    const newUser = factory.build('userFactory', { email: user.email });
    let userResponse = await request.post('/auth/register').send(newUser).expect(400);

    expect(userResponse.body.errors).toContainEqual({
      message: 'An User already exist with this email',
    });
  });

  it('login should contain password', async () => {
    const { password } = factory.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ password }).expect(400);

    expect(userResponse.body.errors).toContainEqual({
      message: 'Please provide an email and password',
    });
  });

  it('login should contain email', async () => {
    const { email } = factory.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ email }).expect(400);

    expect(userResponse.body.errors).toContainEqual({
      message: 'Please provide an email and password',
    });
  });

  it('user with this email dose not exist', async () => {
    const { email, password } = factory.build('userFactory');
    let userResponse = await request.post('/auth/login').send({ email, password }).expect(400);

    expect(userResponse.body.errors).toContainEqual({
      message: 'Email Or Password is Wrong',
    });
  });

  it('entered password must be match with user password', async () => {
    const { email, password, name } = factory.build('userFactory');
    await request.post('/auth/register').send({ email, password, name });
    let userResponse = await request.post('/auth/login').send({ email, password: 'qwesdde112' }).expect(400);

    expect(userResponse.body.errors).toContainEqual({
      message: 'Email Or Password is Wrong',
    });
  });

  it('a user can login', async () => {
    const { email, password, name } = factory.build('userFactory');
    await request.post('/auth/register').send({ email, password, name });
    let userResponse = await request.post('/auth/login').send({ email, password }).expect(200);

    expect(userResponse.body.success).toBe(true);
  });

  it('guest can not see a user info', async () => {
    const user = await request.get('/auth/userInfo').expect(401);

    expect(user.body.errors).toContainEqual({
      message: 'Not authorized to access this route',
    });
  });

  it('a user can get his info', async () => {
    const { email, password, name } = factory.build('userFactory');
    const { body } = await request.post('/auth/register').send({ email, password, name }).expect(200);
    const user = await request.get('/auth/userInfo').set('authorization', `Bearer ${body.token}`).expect(200);

    expect(user.body.name).toEqual(name);
    expect(user.body.email).toEqual(email);
  });
});
