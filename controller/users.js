const bcrypt = require('bcrypt');

const { user: User } = require('../db/models');

exports.createUser = async ctx => {
  try {
    const userData = ctx.request.body;
    let user = await User.findOne({ where: { email: userData.email } });
    if (user) {
      ctx.status = 400;
      ctx.body = {
        error: 'User already exists',
      };
    } else {
      if (userData.password) {
        const hash = await bcrypt.hash(userData.password, 10);
        userData.password = hash;
      }
      user = await User.create({ ...userData });
      user = Object.keys(user.dataValues)
        .filter(key => !['id', 'password'].includes(key))
        .reduce((acc, key) => {
          return {
            ...acc,
            [key]: user[key],
          };
        }, {});
      ctx.body = user;
      ctx.status = 201;
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.getUser = async (ctx, next) => {
  try {
  } catch (error) {}
};
