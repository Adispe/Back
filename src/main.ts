import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {cors: true});
  const port = process.env.PORT;
  setupSwagger(app);
  await app.listen(port);
}
bootstrap();
