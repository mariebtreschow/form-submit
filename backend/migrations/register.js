'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Register',
      'createdAt',
     Sequelize.DATE
    );
  }
};
