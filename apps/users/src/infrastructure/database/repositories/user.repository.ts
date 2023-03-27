import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { map, Observable, catchError, from } from 'rxjs';
import { User, UserDocument } from "../schemas";
import { UserCustomerDocument, UserCustomer } from '../schemas/user-customer.schema';
import { ArtistDocument, Artist } from '../schemas/artist.schema';
import { IUserRepository } from '../../../domain/repository/user-base.repository';
import { IUserModel } from '../../../domain/model/interfaces/user.model';

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectModel(UserCustomer.name) 
        private readonly customerRepository: Model<UserCustomerDocument>,
        
        @InjectModel(Artist.name) 
        private readonly artistRepository: Model<ArtistDocument>
    ) {}

    signIn(username: string, password: string): Observable<UserCustomer | Artist> {
        return from(this.customerRepository.findOne({username, password}))
        .pipe(
            map(
                (user: UserCustomer) => {
                    if(user) {
                        return user   
                    }
                    throw new NotFoundException('User Not Found')
                }
            ),
            catchError(() => {
                return from(this.artistRepository.findOne({username, password}))
                .pipe(
                    map(
                        (artist: Artist) => {
                            if(artist) {
                                return artist   
                            }
                            throw new NotFoundException('User Not Found')
                        }
                    )
                )
            })
        );
    }

    findOneById(id: string): Observable<User> {
        return from(this.customerRepository.findById(id))
            .pipe(
                map(
                    (user: User) => {
                        return user
                    }
                ),
                catchError((err: Error) => {
                    throw new NotFoundException(`Error: ${err}`)
                })
            )
    }

}