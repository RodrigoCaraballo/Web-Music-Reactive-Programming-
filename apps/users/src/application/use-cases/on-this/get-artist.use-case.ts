import { IUserService } from '../../../domain/services/user.service';
import { GetUserCommand } from '../../../domain/interfaces/commands/users-microservice/get-user.command';
import { Observable } from 'rxjs';
import { IArtistModel } from '../../../domain/model/interfaces/artist.model';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../services/user.service';

@Injectable()
export class GetArtistUseCase {
    
    constructor(
        private readonly userService: UserService,
    ) {}

    execute(getUser: GetUserCommand): Observable<IArtistModel> {
        return this.userService.getArtist(getUser.userId);
    }
}