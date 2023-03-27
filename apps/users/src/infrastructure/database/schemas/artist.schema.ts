import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ArtistDocument = HydratedDocument<Artist>;

@Schema()
export class Artist extends User{
    
    @Prop({type: String, ref: 'Name'})
    name: string;
    
    @Prop({type: String, ref: 'Genre'})
    genre: string;

    @Prop({type: String, ref: 'Key'})
    key: string;

}

export const ArtistSchema = SchemaFactory.createForClass(Artist);