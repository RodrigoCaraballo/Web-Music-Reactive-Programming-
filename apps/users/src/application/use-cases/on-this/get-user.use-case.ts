import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GetUserCommand } from '../../../domain/interfaces/commands/users-microservice/get-user.command';
import { IUserService } from '../../../domain/services/user.service';
import { IUserCustomerModel } from '../../../domain/model/interfaces/user-customer.model';
import { UserService } from '../../services/user.service';

@Injectable()
export class GetUserUseCase{
    
    constructor(
        private readonly userService: UserService,
    ) {}

    execute(getUser: GetUserCommand): Observable<IUserCustomerModel> {
        return this.userService.getUser(getUser.userId);
    }
}