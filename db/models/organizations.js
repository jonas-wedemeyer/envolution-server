'use strict';

module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    'organization',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      picture: {
        type: DataTypes.TEXT,
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
      foreignKey: 'organizationId',
      sourceKey: 'id',
      as: 'projects',
    });
  };
  return Organization;
};
