import { Body, Controller, Post, Put } from "@nestjs/common/decorators";
import { UpdateUserPasswordDTO } from "../dto/update-password.dto";
import { Observable } from 'rxjs';
import { IPaySubscriptionCommand } from '../../domain/interfaces/commands/users-microservice/pay-subscription.command';
import { PaySubscriptionUseCase, UpdateUserPasswordUseCase } from "../../application";

@Controller('user')
export class UserController {
    
    constructor(
        private readonly updatePassword: UpdateUserPasswordUseCase,
        private readonly paySubscriptionUseCase: PaySubscriptionUseCase
    ){}

    @Put('update-password')
    updateUserPassword(@Body() updatePassword: UpdateUserPasswordDTO): Observable<boolean> {
        return this.updatePassword.execute(updatePassword);
    }

    @Post('pay-subscription')
    paySubscription(@Body() id: IPaySubscriptionCommand): Observable<boolean> {
        return this.paySubscriptionUseCase.execute(id);
    }
}