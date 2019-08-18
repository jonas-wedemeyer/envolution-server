'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = require('../seed-data/users.json');
    const usersArray = [];
    users.forEach(user => {
      usersArray.push({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        projectId: user.projectId,
        email: user.email,
        password: user.password,
        aboutMe: user.aboutMe,
        interests: user.interests,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('users', usersArray);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null);
  },
};
