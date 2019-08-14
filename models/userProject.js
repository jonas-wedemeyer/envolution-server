module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('userProject', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  UserProject.associate = models => {
    UserProject.belongsTo(models.project, {
      foreignKey: 'projectId',
    });
    UserProject.belongsTo(models.user, {
      foreignKey: 'userId',
    });
  };
  return UserProject;
};
