const atob = require('atob');

const {
  project: Project,
  user: User,
  organization: Organization,
  userProject: UserProject,
} = require('../db/models/');

exports.getAllProjects = async (ctx, next) => {
  try {
    const allProjects = await Project.findAll();
    if (allProjects) {
      ctx.body = {
        status: 'success',
        data: allProjects,
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
  const project = ctx.request.body;
  try {
    const organization = await Organization.findOne({
      where: { id: project.organizationId },
    });
    ctx.assert(organization, 404, 'Organization not found');
    const newProject = await Project.create({ ...project });
    ctx.status = 201;
    ctx.body = newProject;
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
  let id;
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
    const newPax = await UserProject.create({
      id,
      projectId,
      userId: user.id,
      enrollDate: new Date(),
    });
    await Project.decrement('spacesAvailable', {
      by: 1,
      where: {
        id: projectId,
      },
    });
    ctx.status = 200;
    ctx.body = newPax;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
