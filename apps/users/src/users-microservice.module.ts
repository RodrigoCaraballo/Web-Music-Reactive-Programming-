import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { LoginController } from './infrastructure/controllers/login.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { MessagingModule } from './infrastructure/messaging/messaging.module';
import { GetArtistUseCase, GetUserUseCase, LoginService, PaySubscriptionUseCase, RegisterArtistUseCase, RegisterUserUseCase, SignInUseCase, UpdateUserPasswordUseCase, UserService } from './application';
import { UserRepository } from './infrastructure/database/repositories';

@Module({
  imports: [DatabaseModule, MessagingModule, ],
  controllers: [LoginController, UserController],
  providers: [LoginService, UserService, GetArtistUseCase, GetUserUseCase, PaySubscriptionUseCase,
    RegisterArtistUseCase, RegisterUserUseCase, SignInUseCase, UpdateUserPasswordUseCase, UserRepository],
})
export class UsersMicroserviceModule {}
