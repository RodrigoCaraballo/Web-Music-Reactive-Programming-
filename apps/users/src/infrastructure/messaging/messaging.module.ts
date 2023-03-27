import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RegisteredUserPublisher } from './publishers/on-this/registered-user.publisher';
import { LoginSubscriber } from './suscribers/login.subscriber';
import { RegisteredArtistPublisher } from './publishers/on-this/registered-artist.publisher';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'USER_MICROSERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'users_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
    ],
    controllers: [LoginSubscriber],
    providers: [RegisteredUserPublisher, RegisteredArtistPublisher],
    exports: [RegisteredUserPublisher, RegisteredArtistPublisher]
  })
  export class MessagingModule {}
  