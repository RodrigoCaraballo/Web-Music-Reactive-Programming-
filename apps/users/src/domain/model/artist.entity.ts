import { IArtistModel } from "./interfaces";
import { RegisterArtistCommand } from '../interfaces/commands/users-microservice/register-artist.command';

export class ArtistModel implements IArtistModel{
    username: string;
    password: string;
    name: string;
    genre: string;
    key: string;

    constructor(data: RegisterArtistCommand) {
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.genre = data.genre;
        this.key = '';
    }
}