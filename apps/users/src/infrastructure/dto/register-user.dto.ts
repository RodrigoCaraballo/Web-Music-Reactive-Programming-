import { IsString } from '@nestjs/class-validator';
export class RegisterUserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}