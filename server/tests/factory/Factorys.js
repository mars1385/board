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
  owner: function () {
    const user = Factory.build('userFactory');
    return user._id;
  },
});

module.exports = Factory;
