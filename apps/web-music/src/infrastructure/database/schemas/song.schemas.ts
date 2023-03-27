import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SongDocument = HydratedDocument<Song>;

@Schema()
export class Song {
    
    @Prop({type: String, ref: 'Name'})
    name: string;

    @Prop({type: String, ref: 'Artist'})
    artist: string;
    
    @Prop({type: String, ref: 'Genre'})
    genre: string;

    @Prop({type: String, ref: 'Lyrics'})
    lyrics: string;

}

export const SongSchema = SchemaFactory.createForClass(Song);