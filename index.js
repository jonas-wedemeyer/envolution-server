const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const koaJWT = require('koa-jwt');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3002;
const secret = process.env.JWT_SECRET;
const router = require('./router/index');
const db = require('./db/models');

app
  .use(cors())
  .use(bodyParser())
  .use(koaJWT({ secret }).unless({ path: [/^\/sign/] }))
  .use(router.routes())
  .use(router.allowedMethods());

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(port);
    console.log(`Server listening on port ${port}!!`); // eslint-disable-line no-console
  } catch (error) {
    console.error('Error connecting to database', error); // eslint-disable-line no-console
  }
})();
