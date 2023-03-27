import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist{
    
    @Prop({type: String, ref: 'Name'})
    name: string;
    
    @Prop({type: String, ref: 'Genre'})
    songs: string;

}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);