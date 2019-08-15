const { project } = require('../db/models/');

exports.getProjectList = async (ctx, next) => {
  const inputCity = ctx.params.city;
  try {
    const projectList = await project.findAll({
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
    const proj = await project.findOne({
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
    await project
      .create(
        {
          name: proj.name,
          category: proj.category,
          organizationName: proj.organizationName,
          organizationId: proj.organizationId,
          address: proj.address,
          city: proj.city,
          date: proj.date,
          shortTerm: proj.shortTerm,
          time: proj.time,
          description: proj.description,
          role: proj.role,
          qualifications: proj.qualifications,
          tasks: proj.tasks,
          totalSpaces: proj.totalSpaces,
        },
        {
          returning: true,
        },
      )
      .then(project => {
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
    const participants = await project.findAll({
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
    await project
      .addUser('user', {
        through: {
          enrollDate: new Date(),
          where: {
            id: projectId,
          },
          returning: true,
          plain: true,
        },
      })
      .on('success', user => {
        project.decrement('spacesAvailable', {
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
