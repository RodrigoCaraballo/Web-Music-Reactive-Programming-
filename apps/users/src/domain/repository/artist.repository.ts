import { Observable } from 'rxjs';
import { IArtistModel } from '../model/interfaces/artist.model';

export interface IArtistRepository {
    register(user: IArtistModel): Observable<IArtistModel>;

    findOneById(id: string): Observable<IArtistModel>;

    updateUserPassword(id: string, user: IArtistModel): Observable<boolean>;

}