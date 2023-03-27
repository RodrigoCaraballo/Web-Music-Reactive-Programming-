import * as jwt from 'jsonwebtoken';
import { Observable, map } from 'rxjs';
import { RegisterUserCommand } from '../../../domain/interfaces/commands/users-microservice/register-user.command';
import { UserCustomerModel } from '../../../domain/model/customer.entity';
import * as crypto from 'crypto';
import { ILoginService } from '../../../domain/services/login.service';
import { Injectable } from '@nestjs/common';
import { LoginService } from '../../services/login.service';

@Injectable()
export class RegisterUserUseCase {
    constructor(
        private readonly loginService: LoginService,
    ) { }

    execute(user: RegisterUserCommand): Observable<string> {
        if (user) {
            const hashedPassword = crypto.createHash('sha256');
            hashedPassword.update(user.password);

            const newUser = new UserCustomerModel(user);
            newUser.password = hashedPassword.digest('hex');

            const token = this.loginService.registerUser(newUser)
                .pipe(
                    map(value => {
                        const tk: string = jwt.sign({ userId: value.userId }, 'musichash')
                        return tk
                    })
                )

            return token;
        }

        throw new Error('No User Provided')
    }
}