exports.signIn = async (request, factorys, user = null) => {
  const result = await request.post('/auth/register').send(user ? user : factorys.build('userFactory'));

  return result.body.token;
};
