import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type UserCustomerDocument = HydratedDocument<UserCustomer>;

@Schema()
export class UserCustomer extends User{

    @Prop({type: Boolean, ref: 'Premium'})
    isPremium: boolean;

}

export const UserCustomerSchema = SchemaFactory.createForClass(UserCustomer);