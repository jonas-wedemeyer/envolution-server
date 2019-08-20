const Router = require('koa-router');
const router = new Router();
const multer = require('koa-multer');

const upload = multer({ dest: 'uploads/' });

const {
  getProjectList,
  getOneProject,
  updatePax,
  createProject,
  getAllPax,
  getAllProjects,
} = require('../controller/projects');
const { getOneOrg } = require('../controller/organizations');
const {
  createUser,
  getUser,
  findUser,
  editUser,
  uploadPicture,
} = require('../controller/users');

router.post('/sign-up', createUser);
router.get('/sign-in', getUser);
router.get('/myprofile', findUser);
router.put('/myprofile', editUser);
router.post('/myprofile', upload.single('profilePicture'), uploadPicture);

router.get('/projects', getAllProjects);
router.get('/projects/city/:city', getProjectList);
router.get('/projects/:id', getOneProject);
router.post('/projects', createProject);
router.get('/projects/:id/participants', getAllPax);
router.put('/projects/:id', updatePax);

router.get('/orgs/:id', getOneOrg);

module.exports = router;
