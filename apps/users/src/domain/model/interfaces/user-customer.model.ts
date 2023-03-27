import { IUserModel } from './user.model';

export interface IUserCustomerModel extends IUserModel{
    isPremium: boolean;
}