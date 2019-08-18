const { organization: Organization } = require('../db/models/');

exports.getOneOrg = async (ctx, next) => {
  const orgId = ctx.params.id;
  try {
    const organization = await Organization.findOne({
      where: { id: orgId },
    });
    if (organization) {
      ctx.body = {
        status: 'success',
        data: organization,
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
