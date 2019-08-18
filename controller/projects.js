const { project: Project } = require('../db/models/');
const { user: User } = require('../db/models/');

exports.getProjectList = async (ctx, next) => {
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
      id: projectId,
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
  console.log('REQ.BODY', proj);
  try {
    await Project.create({ ...proj }, { returning: true }).then(project => {
      console.log(
        project.get({
          plain: true,
        }),
      );
    });
    ctx.status = 201;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.getAllPax = async (ctx, next) => {
  const projectId = ctx.params.id;
  try {
    const participants = await Project.findAll({
      id: projectId,
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
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
