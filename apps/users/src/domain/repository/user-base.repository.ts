import { Observable } from 'rxjs';
import { IUserModel } from '../model';

export interface IUserRepository {
    signIn(username: string, password: string): Observable<IUserModel>;
}