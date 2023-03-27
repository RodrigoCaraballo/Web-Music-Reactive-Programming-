import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class RegisteredUserPublisher {

    constructor(
        @Inject('USER_MICROSERVICE') private readonly proxy: ClientProxy,
    ) {}

    publish(data: string): void {
        this.proxy.emit('registered-user', data)
    }
}