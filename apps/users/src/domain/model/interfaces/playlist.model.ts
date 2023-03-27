import { ISongModel } from "./song.model";

export interface IPlaylistModel {
    playlistId?: string;
    name: string;
    songs: ISongModel[]
}