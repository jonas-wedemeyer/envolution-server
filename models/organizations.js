'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'organization',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      categories: {
        type: DataTypes.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      picture: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      website: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {},
  );
  Organization.associate = models => {
    Organization.hasMany(models.project, {
      foreignKey: 'organizationId',
      sourceKey: 'id',
    });
  };
  return Organization;
};
