'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    queryInterface.addColumn(
      'Register',
      'createdAt',
     Sequelize.DATE
    );
  }
};
