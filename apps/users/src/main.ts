import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersMicroserviceModule } from './users-microservice.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersMicroserviceModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'users_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.startAllMicroservices();

  await app.listen(3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()} - USERS`);
}
bootstrap();
