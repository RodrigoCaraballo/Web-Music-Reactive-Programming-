import { Controller } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class LoginSubscriber {

    @EventPattern('registered-user')
    registeredUser(@Payload() data: string, @Ctx() context: RmqContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
    
    @EventPattern('registered-artist')
    registeredArtist(@Payload() data: string, @Ctx() context: RmqContext){

        console.log('--------------------------------------')
        console.log('Data: ', data)
        console.log('--------------------------------------')
        console.log('Context: ', context)
        console.log('--------------------------------------')
    }
}