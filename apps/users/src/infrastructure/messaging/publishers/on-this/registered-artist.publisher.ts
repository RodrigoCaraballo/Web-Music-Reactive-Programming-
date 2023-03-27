import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class RegisteredArtistPublisher {

    constructor(
        @Inject('USER_MICROSERVICE') private readonly proxy: ClientProxy,
    ) {}

    publish(data: string): void {
        this.proxy.emit('registered-artist', data)
    }
}