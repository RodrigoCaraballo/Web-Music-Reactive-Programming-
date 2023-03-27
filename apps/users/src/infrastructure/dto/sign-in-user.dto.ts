import { IsString } from '@nestjs/class-validator';
export class SignInUserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}