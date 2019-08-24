'use strict';

module.exports = {
  up: queryInterface => {
    const users = require('../seed-data/users.json');
    const usersArray = users.map(user => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('users', usersArray);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('users', null);
  },
};
