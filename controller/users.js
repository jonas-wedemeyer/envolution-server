const bcrypt = require('bcrypt');
const atob = require('atob');

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
        .filter(
          key => !['id', 'password', 'createdAt', 'updatedAt'].includes(key),
        )
        .reduce((acc, key) => {
          return {
            ...acc,
            [key]: user.dataValues[key],
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

exports.getUser = async ctx => {
  try {
    const authHeader = atob(
      ctx.headers.authorization.split('Basic ').join(''),
    ).split(':');
    const [email, password] = authHeader;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const pwMatch = await bcrypt.compare(password, user.password);
      if (pwMatch) {
        ctx.status = 200;
        ctx.body = Object.keys(user.dataValues)
          .filter(
            key => !['id', 'password', 'createdAt', 'updatedAt'].includes(key),
          )
          .reduce((acc, key) => {
            return {
              ...acc,
              [key]: user.dataValues[key],
            };
          }, {});
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        error: 'User does not exist',
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
};
