import { Artist, ArtistDocument } from '../schemas/artist.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, from, map, Observable } from 'rxjs';
import { User } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IArtistRepository } from '../../../domain/repository/artist.repository';
import { IArtistModel } from '../../../domain/model/interfaces/artist.model';

@Injectable()
export class ArtistRepository implements IArtistRepository {

    constructor(
        @InjectModel(Artist.name) 
        private readonly repository: Model<ArtistDocument>
    ) {}

    register(user: Artist): Observable<Artist> {
        return from(this.repository.create(user))
            .pipe(
                map((user: Artist) => {
                    return user
                }),
                catchError((err: Error) => { throw new Error(`Error: ${err}`) })
            );
    }
    findOneById(id: string): Observable<Artist> {
        return from(this.repository.findById(id))
        .pipe(
            map(
                (user: Artist) => {
                    return user
                }
            ),
            catchError((err: Error) => {
                throw new NotFoundException(`Error: ${err}`)
            })
        )
    }

    updateUserPassword(id: string, user: IArtistModel): Observable<boolean> {
        if(user) {
            return from(this.repository.findByIdAndUpdate(id, user, {new: true}))
        .pipe(
            map((user: IArtistModel) => {
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