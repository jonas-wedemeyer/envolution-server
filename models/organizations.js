'use strict';

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
        type: DataTypes.STRING,
        allowNull: false,
      },
      mission: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );
  Organization.associate = models => {
    Organization.hasMany(models.project, {
      as: 'projects',
    });
  };
  return Organization;
};
