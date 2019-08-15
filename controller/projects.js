const { project: Project } = require('../db/models/projects');

exports.getProjectList = async (ctx, next) => {
  const inputCity = ctx.params.city;
  try {
    const projectList = await Project.findAll({
      city: inputCity,
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
    const project = await Project.findOne({
      id: projectId,
    });
    if (project) {
      ctx.body = {
        status: 'success',
        data: project,
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
    await Project.create({
      name: project.name,
      category: project.category,
      id: project.id,
      adddress: project.address,
      city: project.city,
      date: project.date,
      shortTerm: project.shortTerm,
      time: project.time,
      description: project.description,
      role: project.role,
      qualifications: project.qualifications,
      tasks: project.tasks,
      totalSpaces: project.totalSpaces,
    }).then(project => {
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
      include: [
        {
          model: 'User',
          through: {
            model: 'UserProjects',
            where: {
              projectId: projectId,
            },
          },
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
    await Project.addUser('user', {
      through: {
        enrollDate: new Date(),
        where: {
          id: projectId,
        },
        returning: true,
        plain: true,
      },
    }).on('success', user => {
      Project.decrement('spacesAvailable', {
        by: 1,
        where: {
          id: projectId,
        },
      });
    });
    ctx.status = 200;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
