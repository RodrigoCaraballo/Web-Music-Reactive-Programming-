import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, from, map, Observable } from 'rxjs';
import { UserCustomer, UserCustomerDocument } from '../schemas/user-customer.schema';
import { IUserCustomerRepository } from '../../../domain/repository/user.repository';
import { IUserCustomerModel } from '../../../domain/model/interfaces/user-customer.model';

@Injectable()
export class UserCustomerRepository implements IUserCustomerRepository{

    constructor(
        @InjectModel(UserCustomer.name)
        private readonly repository: Model<UserCustomerDocument>
    ) { }

    register(user: UserCustomer): Observable<UserCustomer> {
        return from(this.repository.create(user))
            .pipe(
                map((user: UserCustomer) => {
                    return user
                }),
                catchError((err: Error) => { throw new Error(`Error: ${err}`) })
            );
    }
    findOneById(id: string): Observable<UserCustomer> {
        return from(this.repository.findById(id))
            .pipe(
                map(
                    (user: UserCustomer) => {
                        return user
                    }
                ),
                catchError((err: Error) => {
                    throw new NotFoundException(`Error: ${err}`)
                })
            )
    }

    updateUserPremium(id: string, entity: UserCustomer): Observable<boolean> {
        return from(this.repository.findByIdAndUpdate(id, entity, { new: true }))
            .pipe(
                map((user: UserCustomer) => {
                    if (user) return true
                    return false
                }),
                catchError((err: Error) => {
                    throw new Error(`Error: ${err}`)
                })
            );
    }

    updateUserPassword(id: string, user: IUserCustomerModel): Observable<boolean> {
        if(user) {
            return from(this.repository.findByIdAndUpdate(id, user, {new: true}))
        .pipe(
            map((user: IUserCustomerModel) => {
                if(user) return true
                throw new Error('User Customer Update Password')
            }),
            catchError((err: Error) => {
                throw new Error(`Error: ${err}`)
            })
        );
        }

        throw new Error('No Entity Provided - User Respository')
        
    }

}