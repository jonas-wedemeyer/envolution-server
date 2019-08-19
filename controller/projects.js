const {
  project: Project,
  user: User,
  organization,
  Organization,
} = require('../db/models/');

exports.getProjectList = async (ctx, next) => {
  console.log('Im here!');
  const inputCity = ctx.params.city;
  try {
    const projectList = await Project.findAll({
      where: { city: inputCity },
    });
    if (projectList) {
      ctx.body = {
        status: 'success',
        data: projectList,
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

exports.getOneProject = async (ctx, next) => {
  const projectId = ctx.params.id;
  try {
    const proj = await Project.findOne({
      where: { id: projectId },
    });
    if (proj) {
      ctx.body = {
        status: 'success',
        data: proj,
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

exports.createProject = async (ctx, next) => {
  const proj = ctx.request.body;
  try {
    await Organization.findOne({
      where: { id: proj.organizationId },
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
      // }).then(org => {
      //   if (!org) {
      //     return ctx.assert(org, 404, 'Organization not found');
      //   }
      //   await Project.create({ ...proj });
      //   ctx.body = proj;
      //   ctx.status = 201;
    });
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.getAllPax = async (ctx, next) => {
  const projectId = ctx.params.id;
  try {
    const participants = await Project.findAll({
      where: { id: projectId },
      include: {
        model: User,
        as: 'users',
      },
    });
    if (participants) {
      ctx.body = {
        status: 'success',
        data: participants,
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

exports.updatePax = async (ctx, next) => {
  const projectId = ctx.params.id;
  try {
    await Project.update('user', {
      through: {
        enrollDate: new Date(),
      },
      where: {
        id: projectId,
      },
      returning: true,
      plain: true,
    });
    await Project.decrement('spacesAvailable', {
      by: 1,
      where: {
        id: projectId,
      },
    });
    ctx.status = 200;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
