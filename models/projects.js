'use strict';

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'project',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      shortTerm: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qualifications: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      tasks: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      totalSpaces: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      spacesAvailable: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Project.associate = models => {
    Project.belongsTo(models.organization, {
      foreignKey: 'organizationId',
      as: 'organization',
    });
    Project.belongsToMany(models.user, {
      through: models.userProject,
      foreignKey: 'projectId',
      as: 'users',
    });
  };
  return Project;
};
