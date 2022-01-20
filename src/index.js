require('./bootstrap');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const configService = require('./services/ConfigService');
const loggerService = require('./services/LoggerService');
const router = require('./api/routes');
const errorHandler = require('./api/middleware/errorHandler');
const loggerHandler = require('./api/middleware/loggerHandler');
const { guard } = require('./api/middleware/authorization');

const config = {
  host: configService.host,
  port: configService.port,
};

const app = new Koa();

app.use(bodyParser());

app.use(errorHandler);

app.use(loggerHandler);

app.use(guard());

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(config.port, () => {
  loggerService.info(
    `App is listening on http://${config.host}:${config.port}`
  );
});
