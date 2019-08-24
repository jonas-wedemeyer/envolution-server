'use strict';

module.exports = {
  up: queryInterface => {
    const organizations = require('../seed-data/organizations.json');
    const orgsArray = organizations.map(org => ({
      ...org,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('organizations', orgsArray);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('organizations', null);
  },
};
