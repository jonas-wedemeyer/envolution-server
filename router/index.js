const Router = require('koa-router');
const router = new Router();

const controller = require('../controller/');

router.get('/projects', controller.projects.getProjectList);
router.get('/projects/:id', controller.projects.getOneProject);
router.put('/projects/:id', controller.projects.updatePax);

router.get('/orgs/:id', controller.organizations.getOneOrg);

module.exports = router;
