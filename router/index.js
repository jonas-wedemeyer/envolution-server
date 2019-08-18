const Router = require('koa-router');
const router = new Router();

const {
  getProjectList,
  getOneProject,
  updatePax,
  createProject,
  getAllPax,
} = require('../controller/projects');
const { getOneOrg } = require('../controller/organizations');
const { createUser } = require('../controller/users');

router.post('/sign-up', createUser);

router.get('/projects', getProjectList);
router.get('/projects/:id', getOneProject);
router.post('/projects', createProject);
router.get('/projects/:id/participants', getAllPax);
router.put('/projects/:id', updatePax);

router.get('/orgs/:id', getOneOrg);

module.exports = router;
