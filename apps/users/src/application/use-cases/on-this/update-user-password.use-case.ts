import { Observable, map, switchMap, from, catchError, of } from 'rxjs';
import { GetUserUseCase } from './get-user.use-case';
import { UpdateUserPasswordCommand } from '../../../domain/interfaces/commands/users-microservice/update-password.command';
import * as crypto from 'crypto';
import { IUserCustomerModel } from '../../../domain/model/interfaces/user-customer.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetArtistUseCase } from './get-artist.use-case';
import { IArtistModel } from '../../../domain/model/interfaces/artist.model';
import { UserService } from '../../services/user.service';

@Injectable()
export class UpdateUserPasswordUseCase {

    constructor(
        private readonly userService: UserService,
    ) { }

    execute(updatePassword: UpdateUserPasswordCommand): Observable<boolean> {
        const hashedPassword = crypto.createHash('sha256');
        hashedPassword.update(updatePassword.password);

        const id = updatePassword.userId
        const password = hashedPassword.digest('hex');

        return this.userService.updateUserPassword(id, password)
    }
}