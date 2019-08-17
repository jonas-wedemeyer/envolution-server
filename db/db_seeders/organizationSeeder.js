'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const organizations = require('./organizations.json');
    const orgsArray = [];
    organizations.forEach(org => {
      orgsArray.push({
        id: org.id,
        name: org.name,
        mission: org.mission,
        city: org.city,
        category: org.category,
        logo: org.logo,
        picture: org.picture,
        website: org.website,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('organizations', orgsArray);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('organizations', null);
  },
};
