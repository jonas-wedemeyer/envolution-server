const { project: Project } = require('../models/projects');

exports.getProjectList = async (ctx, next) => {
  try {
    const projectList = await Project.findAll();
    const filteredProjects = projectList.filter(
      project => project.city === ctx.params.city,
    );
    ctx.body = {
      status: 'success',
      data: filteredProjects,
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.getOneProject = async (ctx, next) => {
  try {
    const project = await Project.findOne(ctx.params.id);
    ctx.body = {
      status: 'success',
      data: project,
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};

exports.updatePax = async (ctx, next) => {
  try {
    Project.update(
      { userId: ctx.request.body },
      { returning: true, where: { projectId: ctx.params.projectId } },
    );
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
