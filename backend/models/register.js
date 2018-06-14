const { sequelize, Register } = require('./db');

function createUser(user) {
  return Register.create(user)
    .then((user) => {
    return {
      success: true,
      timestamp: +(user.dataValues.createdAt),
      error: null
    };
  }).catch((err) => {
    if (err.errors) {
      return err.errors[0];
    }
    return err;
  });
};

function getUser(timestamp) {
  return Register.findOne({
    where: {
      createdAt: timestamp
    }
  }).then((user) => {
    if (!user) {
      return { message: `No user with this timestamp`};
    }
    return user;
  }).catch((err) => {
    if (err.errors) {
      return err.errors[0];
    }
    return err;
  });
}

module.exports = {
    createUser,
    getUser
}

/* TODO:
 * Validate that username doesn't exist
 * Add the values to the db if valid
 * Return response
 */
