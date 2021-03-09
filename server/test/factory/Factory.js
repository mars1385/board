const faker = require('faker');
const { Factory } = require('rosie');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

Factory.define('userFactory').attrs({
  _id: () => new ObjectId(),
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});

Factory.define('projectFactory').attrs({
  _id: () => new ObjectId(),
  title: () => faker.name.title(),
  description: () => faker.commerce.productDescription(),
  generalNote: () => faker.lorem.paragraphs(2),
  owner: function () {
    const user = Factory.build('userFactory');
    return user._id;
  },
});

Factory.define('taskFactory').attrs({
  _id: () => new ObjectId(),
  body: () => faker.commerce.productDescription(),
  project: function () {
    const project = Factory.build('projectFactory');
    return project._id;
  },
});

module.exports = Factory;
