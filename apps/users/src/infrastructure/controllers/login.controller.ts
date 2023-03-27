import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDTO } from '../dto/register-user.dto';
import { RegisterArtistDTO } from '../dto/register-artist.dto';
import { SignInUserDTO } from '../dto/sign-in-user.dto';
import { Observable, tap } from 'rxjs';
import { RegisterArtistUseCase, RegisterUserUseCase, SignInUseCase } from '../../application';
import { RegisteredUserPublisher } from '../messaging/publishers/on-this/registered-user.publisher';
import { RegisteredArtistPublisher } from '../messaging/publishers/on-this/registered-artist.publisher';

@Controller('login')
export class LoginController {

    constructor(
        private readonly registerUserCustomer: RegisterUserUseCase,
        private readonly registerUserArtist: RegisterArtistUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly userPublisher: RegisteredUserPublisher,
        private readonly artistPublisher: RegisteredArtistPublisher

    ){}

    @Post('register-user')
    registerUser(@Body() user: RegisterUserDTO): Observable<string>{
        return this.registerUserCustomer.execute(user)
        .pipe(
            tap(
                (data: string) => {
                    this.userPublisher.publish(data);
                }
            )
        );
    }

    @Post('register-artist')
    registerArtist(@Body() artist: RegisterArtistDTO): Observable<string> {
        return this.registerUserArtist.execute(artist)
        .pipe(
            tap(
                (data: string) => {
                    this.artistPublisher.publish(data);
                }
            )
        );
    }

    @Post('sign-in')
    signIn(@Body() signIn: SignInUserDTO): Observable<string> {
        return this.signInUseCase.execute(signIn);
    }
}