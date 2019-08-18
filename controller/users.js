const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');

const { user: User } = require('../db/models');
const { filterProps } = require('../utils/filterProps');

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
      user = filterProps(user.dataValues, [
        'id',
        'password',
        'createdAt',
        'updatedAt',
      ]);
      ctx.status = 201;
      ctx.body = { token: jwt.sign(user, process.env.JWT_SECRET) };
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.getUser = async ctx => {
  try {
    const authHeader = atob(ctx.headers.authorization.split(' ')[1]).split(':');
    const [email, password] = authHeader;
    let user = await User.findOne({ where: { email } });

    if (user) {
      const pwMatch = await bcrypt.compare(password, user.password);
      if (pwMatch) {
        user = filterProps(user.dataValues, [
          'id',
          'password',
          'createdAt',
          'updatedAt',
        ]);
        ctx.status = 200;
        ctx.body = { token: jwt.sign(user, process.env.JWT_SECRET) };
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
