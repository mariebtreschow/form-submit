const register = require('../controllers/register');
const assert = require('chai').assert
const { Register } = require('../models/db');

describe('Create User', () => {

  after(() => {
    return Register.destroy({
      where: {
        username: ['marieTest']
      },
      truncate: true /* this will ignore where and truncate the table instead */
    }).then((res) => {
      console.log('Clean up after tests run..');
    });
  });

  it('should create a user', (done) => {
    const data = {
      username: 'marieTest',
      company: 'MOBGEN',
      country: 'Denmark'
    };
    register.create(data).then((user) => {
      assert.isObject(user, 'must return a user object');
      assert.property(user, 'success', 'must have property success');
      assert.property(user, 'error', 'must have property error');
      assert.property(user, 'timestamp', 'must have property timestamp');
      assert.isTrue(user.success, 'must include success property');
      assert.isNull(user.error, 'error must be null');
      assert.isNumber(user.timestamp, 'timestamp should be a number');
      done();
    });
  });
  it('should not be able to create a user with the same username', (done) => {
    const data = {
      username: 'marieTest',
      company: 'MOBGEN',
      country: 'Denmark'
    };
    register.create(data).then((err) => {
      assert.isObject(err, 'must return a user object');
      assert.equal(err.message, 'username must be unique');
      assert.equal(err.type, 'unique violation');
      done();
    });
  });
  it('should not be able to create a user with too short username', (done) => {
    const data = {
      username: 'm',
      company: 'MOBGEN',
      country: 'Denmark'
    };
    try {
      register.create(data);
    } catch (err) {
      assert.isObject(err, 'must return a user object');
      assert.property(err.error.extra, 'validUsername', 'must have property validUsername');
      assert.equal(err.error.extra.validUsername, 'Username is too short');
      assert.equal(err.error.message, 'There are some validation issues');
      assert.equal(err.error.success, false, 'success must be false');
      assert.equal(err.error.status, 403, 'status must be 403');
      done();
    }
  });
  it('should not be able to create a user with a not valid country', (done) => {
    const data = {
      username: 'marieTest',
      company: 'MOBGEN',
      country: 'USA'
    };
    try {
      register.create(data);
    } catch (err) {
      assert.isObject(err, 'must return a user object');
      assert.property(err.error.extra, 'validCountry', 'must have property validCountry');
      assert.equal(err.error.extra.validCountry, 'Not a valid country');
      assert.equal(err.error.message, 'There are some validation issues');
      assert.equal(err.error.success, false, 'success must be false');
      assert.equal(err.error.status, 403, 'status must be 403');
      done();
    }
  });
  it('should not be able to create a user without any data', (done) => {
    const data = {};
    try {
      register.create(data);
    } catch (err) {
      assert.isObject(err, 'must return a user object');
      assert.property(err.error.extra, 'country', 'must have property country');
      assert.property(err.error.extra, 'company', 'must have property company');
      assert.property(err.error.extra, 'username', 'must have property username');
      assert.equal(err.error.extra.company, 'Company cannot be empty');
      assert.equal(err.error.extra.country, 'Country cannot be empty');
      assert.equal(err.error.extra.username, 'Username cannot be empty');
      assert.equal(err.error.message, 'There are some validation issues');
      assert.equal(err.error.success, false, 'success must be false');
      assert.equal(err.error.status, 403, 'status must be 403');
      done();
    }
  });
});

// describe('Get User by timestamp', () => {
//   it('should get user by its timestamp', (done) => {
//     done();
//   });
//
//   it('should return not found when providing wrong timestamp', (done) => {
//     done();
//   });
// });
