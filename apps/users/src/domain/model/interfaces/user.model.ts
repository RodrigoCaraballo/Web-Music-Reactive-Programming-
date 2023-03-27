import { IArtistModel } from "./artist.model";
import { IUserCustomerModel } from "./user-customer.model";

export interface IUserModel {
    userId?: string;
    username: string;
    password: string;
}