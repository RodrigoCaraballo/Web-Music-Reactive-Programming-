export interface IRequestAddPlaylistCommand {
    name: string;
    songsIds?: string[];
    userId: string;
}