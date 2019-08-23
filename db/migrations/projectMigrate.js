'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  },
};
