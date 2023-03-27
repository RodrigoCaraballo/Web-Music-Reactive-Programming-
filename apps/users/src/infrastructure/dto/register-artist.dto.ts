import { IsString } from "@nestjs/class-validator";

export class RegisterArtistDTO {
    @IsString()
    username: string;
    
    @IsString()
    password: string;
    
    @IsString()
    name: string;
    
    @IsString()
    genre: string;
}