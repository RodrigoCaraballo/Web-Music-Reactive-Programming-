import { IUserService } from '../../../domain/services/user.service';
import { Observable, map, switchMap, catchError } from 'rxjs';
import { IUserCustomerModel } from '../../../domain/model/interfaces/user-customer.model';
import { GetUserUseCase } from './get-user.use-case';
import { IPaySubscriptionCommand } from '../../../domain/interfaces/commands/users-microservice/pay-subscription.command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Injectable()
export class PaySubscriptionUseCase {

    constructor(
        private readonly userService: UserService,
        private readonly getUseCase: GetUserUseCase
    ) { }

    execute(id: IPaySubscriptionCommand): Observable<boolean> {
        return this.getUseCase.execute({userId: id.userId})
        .pipe(
            switchMap(
                (user: IUserCustomerModel) => {
                    user.isPremium = true;
                    return this.userService.paySubscription(id.userId, user)
                    .pipe(
                        catchError((err: Error) => {
                            throw new Error(`Eror: ${err.message}`)
                        })
                    )
                }
            )
        )
    }

}