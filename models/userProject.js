module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define('userProject', {
    projectId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
  });

  UserProject.associate = models => {
    UserProject.belongsTo(models.project, {
      foreignKey: 'projectId',
      targetKey: 'id',
    });
    UserProject.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return UserProject;
};
