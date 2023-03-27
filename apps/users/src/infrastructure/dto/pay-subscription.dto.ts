import { IsString } from '@nestjs/class-validator';
export class IPaySubscriptionDTO {
    @IsString()
    userId: string;
}