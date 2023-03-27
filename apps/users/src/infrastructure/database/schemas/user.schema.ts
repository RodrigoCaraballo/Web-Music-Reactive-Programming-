import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';
import { UserCustomer, UserCustomerSchema } from './user-customer.schema';
import { Artist, ArtistSchema } from './artist.schema';
import { IsOptional } from '@nestjs/class-validator'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, ref: 'Email', required: true})
    username: string;

    @Prop({ type: String, ref: 'Password', required: true})
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);