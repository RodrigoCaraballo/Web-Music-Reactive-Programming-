import { Observable } from 'rxjs';
import { ILoginService } from '../../../domain/services/login.service';
import { SignInUserCommand } from '../../../domain/interfaces/commands/users-microservice/sign-in-user.command';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { LoginService } from '../../services/login.service';

@Injectable()
export class SignInUseCase {

    constructor(
        private readonly loginService: LoginService,
    ) {}

    execute(signIn: SignInUserCommand): Observable<string> {
        const username = signIn.username;
        
        const hashedPassword = crypto.createHash('sha256');
        hashedPassword.update(signIn.password);

        const password = hashedPassword.digest('hex');
        
        return this.loginService.signInUser(username, password);
    }
}