import { Observable } from 'rxjs';
import { IUserCustomerModel, IUserModel } from "../model";

export interface IUserCustomerRepository{
    register(user: IUserCustomerModel): Observable<IUserCustomerModel>;

    findOneById(id: string): Observable<IUserCustomerModel>;

    updateUserPremium(id: string, entity: IUserModel): Observable<boolean>

    updateUserPassword(id: string, user: IUserCustomerModel): Observable<boolean>;

}