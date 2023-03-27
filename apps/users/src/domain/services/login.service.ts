import { Observable } from 'rxjs';

import { IArtistModel } from '../model/interfaces/artist.model';
import { IUserModel } from "../model/interfaces/user.model";
import { IUserCustomerModel } from '../model/interfaces/user-customer.model';
import { SignInUserCommand } from '../interfaces/commands/users-microservice/sign-in-user.command';

export interface ILoginService {

    registerUser(user: IUserCustomerModel): Observable<IUserCustomerModel>;
    registerArtist(user: IArtistModel): Observable<IArtistModel>;
    signInUser(username: string, password: string): Observable<string>;
}