import { IUserModel } from "./user.model";

export interface IArtistModel extends IUserModel{
    name: string;
    genre: string;
    key: string;
}