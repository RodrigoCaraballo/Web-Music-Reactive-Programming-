import { IsString } from '@nestjs/class-validator';
export class GetUserDTO {
    @IsString()
    userId: string;
}