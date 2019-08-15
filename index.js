const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const port = process.env.SERVER_PORT || 3001;

const router = require('./router/index');
const db = require('./db/models');

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

(async () => {
  try {
    await db.sequelize.sync();
    app.listen(port);
    console.log(`Server listening!!`); // eslint-disable-line no-console
  } catch (error) {
    console.error('Error connecting to database', error); // eslint-disable-line no-console
  }
})();
