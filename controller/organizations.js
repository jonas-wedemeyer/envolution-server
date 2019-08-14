const { organization: Organization } = require('../models/organizations');

exports.getOneOrg = async (ctx, next) => {
  try {
    const organization = await Organization.findOne(ctx.params.id);
    ctx.body = {
      status: 'success',
      data: organization,
    };
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
  }
};
