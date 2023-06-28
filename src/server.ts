import { Server } from 'http';
import mongoose from 'mongoose';
import process from 'node:process';
import app from './app';
import config from './config';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Database connected');

    server = app.listen(config.port, () => {
      console.log(`CAT_HUT app listening on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  if (server) {
    console.log('SIGTERM is receiverd');
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
