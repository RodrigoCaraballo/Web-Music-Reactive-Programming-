import { IRequestAddSongCommand } from '../interfaces/commands/music-microservice/request-add-song.command';
import { Observable } from 'rxjs';
import { IRequestAddPlaylistCommand } from '../interfaces/commands/music-microservice/request-add-playlist.command';
import { IRequestAddSongToPlaylist } from '../interfaces/commands/music-microservice/request-add-song-to-playlist.command';
export interface IArtistService {
    
    requestAddSong(song: IRequestAddSongCommand): Observable<boolean>;
    requestAddPlaylist(playlist: IRequestAddPlaylistCommand): Observable<boolean>;
    requestAddSongToPlaylist(addSong: IRequestAddSongToPlaylist): Observable<boolean>
}