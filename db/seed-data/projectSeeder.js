'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const projects = require('../seed-data/projects.json');
    const projectsArray = [];
    projects.forEach(proj => {
      projectsArray.push({
        id: proj.id,
        name: proj.name,
        category: proj.category,
        organizationName: proj.organizationName,
        organizationId: proj.organizationId,
        address: proj.address,
        city: proj.city,
        date: proj.date,
        shortTerm: proj.shortTerm,
        time: proj.time,
        picture: proj.picture,
        description: proj.description,
        role: proj.role,
        qualifications: proj.qualifications,
        tasks: proj.tasks,
        totalSpaces: proj.totalSpaces,
        spacesAvailable: proj.spacesAvailable,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return queryInterface.bulkInsert('projects', projectsArray);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null);
  },
};
