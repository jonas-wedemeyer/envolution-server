module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  });

  User.associate = models => {
    User.belongsToMany(models.project, {
      through: models.userProject,
      foreignKey: 'userId',
      as: 'projects',
    });
  };

  return User;
};
