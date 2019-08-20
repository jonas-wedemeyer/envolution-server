const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const { user: User, project: Project } = require('../db/models');
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
        'picture',
        'password',
        'aboutMe',
        'interests',
        'createdAt',
        'updatedAt',
      ]);
      ctx.status = 201;
      ctx.body = {
        token: jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7 days' }),
      };
    }
  } catch (error) {
    ctx.status = 500;
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
          'picture',
          'password',
          'aboutMe',
          'interests',
          'createdAt',
          'updatedAt',
        ]);
        ctx.status = 200;
        ctx.body = {
          token: jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '7 days',
          }),
        };
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

exports.findUser = async (ctx, next) => {
  const { email } = JSON.parse(
    atob(ctx.request.header.authorization.split('.')[1]),
  );
  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Project,
          as: 'projects',
        },
      ],
    });

    if (user) {
      ctx.body = {
        status: 'success',
        data: user,
      };
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.editUser = async (ctx, next) => {
  const editedUser = ctx.request.body;
  const { email } = JSON.parse(
    atob(ctx.request.header.authorization.split('.')[1]),
  );
  try {
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: Project,
          as: 'projects',
        },
      ],
    });
    if (user) {
      const updatedUser = await User.update(
        filterProps(editedUser.data, ['id', 'password']),
        {
          where: { email },
        },
      );
      ctx.body = {
        status: 'success',
        data: updatedUser,
      };
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.uploadPicture = async (ctx, next) => {
  try {
    const picture = await cloudinary.uploader.upload(
      path.resolve(ctx.request.body.files),
      { format: 'jpg' },
    );
    const { email } = JSON.parse(
      atob(ctx.request.header.authorization.split('.')[1]),
    );
    const user = await User.findOne({
      where: { email },
    });
    await user.update({ picture: picture.secure_url });
    ctx.status = 200;
    ctx.body = { picture: picture.secure_url };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
