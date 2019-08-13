const Koa = require('koa');
const app = new Koa();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Backend server running!!`);
});
