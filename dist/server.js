'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const node_process_1 = __importDefault(require('node:process'));
const app_1 = __importDefault(require('./app'));
const config_1 = __importDefault(require('./config'));
node_process_1.default.on('uncaughtException', error => {
  console.log(error);
  node_process_1.default.exit(1);
});
let server;
async function bootstrap() {
  try {
    await mongoose_1.default.connect(config_1.default.database_url);
    console.log('Database connected');
    server = app_1.default.listen(config_1.default.port, () => {
      console.log(`CAT_HUT app listening on ${config_1.default.port}`);
    });
  } catch (error) {
    console.log(error);
  }
  node_process_1.default.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        node_process_1.default.exit(1);
      });
    }
  });
}
bootstrap();
node_process_1.default.on('SIGTERM', () => {
  if (server) {
    console.log('SIGTERM is receiverd');
    server.close(() => {
      node_process_1.default.exit(1);
    });
  } else {
    node_process_1.default.exit(1);
  }
});
