import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from "aws-sdk";

// Программа не видит файл .env
async function bootstrap() {
  const PORT = process.env.PORT;
  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, ()=>console.log(`Server has been on port = ${PORT}`));
}
bootstrap();
