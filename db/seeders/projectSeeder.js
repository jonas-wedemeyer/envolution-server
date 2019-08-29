'use strict';

module.exports = {
  up: queryInterface => {
    const projects = require('../seed-data/projects.json');
    const projectsArray = projects.map(proj => ({
      ...proj,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('projects', projectsArray);
  },
  down: queryInterface => {
    return queryInterface.bulkDelete('projects', null);
  },
};
