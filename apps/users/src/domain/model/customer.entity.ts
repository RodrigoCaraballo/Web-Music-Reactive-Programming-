import { RegisterUserCommand } from "../interfaces/commands/users-microservice";
import { IUserCustomerModel } from "./interfaces";

export class UserCustomerModel implements IUserCustomerModel {
    username: string;
    password: string;
    isPremium: boolean;

    constructor(data: RegisterUserCommand) {
        this.username = data.username;
        this.password = data.password;
        this.isPremium = false;
    }
}