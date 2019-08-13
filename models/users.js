module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  User.associate = models => {
    User.hasMany(models.project, {
      through: models.userProject,
      as: 'projects',
    });
  };

  return User;
};
