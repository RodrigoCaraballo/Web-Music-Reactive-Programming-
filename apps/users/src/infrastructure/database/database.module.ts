import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtistRepository, UserCustomerRepository, UserRepository } from './repositories';
import { User, UserCustomer, UserCustomerSchema, ArtistSchema, Artist, UserSchema} from './schemas';

@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://rodrigocaraballo:rodri007@cluster0.fzcprav.mongodb.net/musicPlayerDb?retryWrites=true&w=majority',),
        MongooseModule.forFeature([{name: Artist.name, schema: ArtistSchema}, 
            {name: UserCustomer.name, schema: UserCustomerSchema}])
    ],
    controllers: [],
    providers: [{ provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserCustomerRepository', useClass: UserCustomerRepository },
    { provide: 'IArtistRepository', useClass: ArtistRepository }],
    exports: ['IUserRepository', 'IUserCustomerRepository', 'IArtistRepository', MongooseModule]
  })
  export class DatabaseModule {}