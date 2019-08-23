'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organizations', {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organizations');
  },
};
