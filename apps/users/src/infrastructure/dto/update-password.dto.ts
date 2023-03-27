import { IsString } from '@nestjs/class-validator';
export class UpdateUserPasswordDTO {
    @IsString()
    userId: string;

    @IsString()
    password: string;
}