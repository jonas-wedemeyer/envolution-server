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

router.get('/projects', getProjectList);
router.get('/projects/:id', getOneProject);
router.post('/projects', createProject);
router.get('/projects/:id', getAllPax);
router.put('/projects/:id', updatePax);

router.get('/orgs/:id', getOneOrg);

module.exports = router;
