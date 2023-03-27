import { ILoginService } from '../../../domain/services/login.service';
import { map } from 'rxjs';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { ArtistModel } from '../../../domain/model/artist.entity';
import { RegisterArtistCommand } from '../../../domain/interfaces/commands/users-microservice/register-artist.command';
import { Injectable } from '@nestjs/common';
import { LoginService } from '../../services/login.service';

@Injectable()
export class RegisterArtistUseCase {
    constructor(
        private readonly loginService: LoginService,
    ) { }

    execute(artist: RegisterArtistCommand) {
        if (artist) {
            const hashedPassword = crypto.createHash('sha256');
            hashedPassword.update(artist.password);

            const newArtist = new ArtistModel(artist);
            newArtist.password = hashedPassword.digest('hex');
            const token = this.loginService.registerArtist(newArtist)
                .pipe(
                    map(value => {
                        const tk: string = jwt.sign({ userId: value.userId }, 'musichash')
                        return tk
                    })
                )

            return token;
        }

        throw new Error('No Artist Provided')
    }
}