import { Observable } from 'rxjs';

import { IUserModel } from "../model/interfaces/user.model";
import { IRequestPlaySong } from '../interfaces/commands/music-microservice/request-play-song.command';
import { ISongModel } from '../model/interfaces/song.model';
import { IRequestPlayPlaylist } from '../interfaces/commands/music-microservice/request-play-playlist.command';
import { IPlaylistModel } from '../model/interfaces/playlist.model';
import { IPaySubscriptionCommand } from '../interfaces/commands/users-microservice/pay-subscription.command';
import { IRequestAddPlaylistCommand } from '../interfaces/commands/music-microservice/request-add-playlist.command';
import { IRequestAddSongToPlaylist } from '../interfaces/commands/music-microservice/request-add-song-to-playlist.command';
import { IUserCustomerModel } from '../model/interfaces/user-customer.model';
import { IArtistModel } from '../model/interfaces/artist.model';

export interface IUserService {
    updateUserPassword(id: string, password: string): Observable<boolean>;
    getUser(id: string): Observable<IUserCustomerModel>;
    getArtist(id: string): Observable<IArtistModel>;

    // requestPlaySong(song: IRequestPlaySong): Observable<ISongModel>;
    // requestPlayPlaylist(playlist: IRequestPlayPlaylist): Observable<IPlaylistModel>;

    paySubscription(id: string, entity: IUserCustomerModel): Observable<boolean>;

    // requestAddPlaylist(playlist: IRequestAddPlaylistCommand): Observable<boolean>;
    // requestAddSongToPlaylist(addSong: IRequestAddSongToPlaylist): Observable<boolean>
}