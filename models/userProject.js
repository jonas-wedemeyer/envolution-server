module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('userProject', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.UUID,
    },
    userId: {
      type: DataTypes.UUID,
    },
    date: {
      type: DataTypes.DATE,
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
