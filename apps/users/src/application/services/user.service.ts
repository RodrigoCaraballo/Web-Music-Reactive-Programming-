import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { catchError, forkJoin, map, Observable, switchMap } from 'rxjs';
import { IUserService } from '../../domain/services/user.service';
import { IUserCustomerModel } from '../../domain/model/interfaces/user-customer.model';
import { IArtistModel } from '../../domain/model';
import { IUserRepository } from '../../domain/repository';
import { IUserCustomerRepository } from '../../domain/repository/user.repository';
import { IArtistRepository } from '../../domain/repository/artist.repository';

@Injectable()
export class UserService implements IUserService {

    constructor(
        @Inject('IUserRepository') private readonly userRepository: IUserRepository,
        @Inject('IUserCustomerRepository') private readonly customerRepository: IUserCustomerRepository,
        @Inject('IArtistRepository') private readonly artistRepository: IArtistRepository
    ) { }

    updateUserPassword(id: string, password: string): Observable<boolean> {
        const user$: Observable<IUserCustomerModel> = this.customerRepository.findOneById(id);
        const artist$: Observable<IArtistModel> = this.artistRepository.findOneById(id);
        return forkJoin([user$, artist$]).pipe(
            switchMap(([user, artist]) => {
                if (user) {
                    user.password = password
                    return this.customerRepository.updateUserPassword(id, user)
                    .pipe(
                        map(
                            () => true
                        ),
                        catchError(
                            (err: Error) => {
                                throw new Error(`Update Password Service: ${err.message}`)
                            }
                        )
                    );
                }

                if (artist) {
                    artist.password = password
                    return this.artistRepository.updateUserPassword(id, artist)
                    .pipe(
                        map(
                            () => true
                        ),
                        catchError(
                            (err: Error) => {
                                throw new Error(`Update Password Service: ${err.message}`)
                            }
                        )
                    );
                }
                throw new NotFoundException('User not found');
            }),
            catchError((err) => {
                throw new NotFoundException(`Error: ${err.message}`);
            })
        );
    }
    getUser(id: string): Observable<IUserCustomerModel> {
        return this.customerRepository.findOneById(id);
    }
    getArtist(id: string): Observable<IArtistModel> {
        return this.artistRepository.findOneById(id);
    }
    paySubscription(id: string, entity: IUserCustomerModel): Observable<boolean> {
        return this.customerRepository.updateUserPremium(id, entity);
    }

}