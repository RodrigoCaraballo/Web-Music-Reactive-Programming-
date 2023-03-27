import { Injectable, Inject } from '@nestjs/common';
import { Observable, map, catchError } from 'rxjs';
import { IArtistModel } from '../../domain/model/interfaces/artist.model';
import { IUserCustomerModel } from '../../domain/model/interfaces/user-customer.model';
import { IUserModel } from '../../domain/model/interfaces/user.model';
import * as jwt from 'jsonwebtoken';
import { ILoginService } from '../../domain/services/login.service';
import { IUserRepository } from '../../domain/repository';
import { IUserCustomerRepository } from '../../domain/repository/user.repository';
import { IArtistRepository } from '../../domain/repository/artist.repository';


@Injectable()
export class LoginService implements ILoginService{
    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserCustomerRepository') private readonly customerRepository: IUserCustomerRepository,
        @Inject('IArtistRepository') private readonly artistRepository: IArtistRepository
    ){}
    registerUser(user: IUserCustomerModel): Observable<IUserCustomerModel> {
        return this.customerRepository.register(user);
    }
    registerArtist(user: IArtistModel): Observable<IArtistModel> {
        return this.artistRepository.register(user);
    }
    signInUser(username: string, password: string): Observable<string> {
        return this.userRepository.signIn(username, password)
        .pipe(
            map(
                (user: IUserModel) => {
                    
                    const tk: string = jwt.sign({userId: user.userId}, 'musichash')
                    return tk
                }
            ),
            catchError((err: Error) => {
                throw new Error(`Error: ${err}`)
            })
        )
    }

    
}