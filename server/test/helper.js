const factory = require('./factory/Factory');

exports.signIn = async (request, user = null) => {
  const result = await request.post('/auth/register').send(user ? user : factory.build('userFactory'));

  return result.body.token;
};
