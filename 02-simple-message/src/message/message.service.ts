import { Injectable, InjectableOptions } from "@nestjs/common";
import { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService {
    // messageRepository: MessageRepository;

    // // constructor() {
    // //     // Serivce is creating its own dependencies
    // //     // DONT DO THIS ON REAL APPS
    // //     this.messageRepository = new MessageRepository();
    // // }

    // constructor(messagesRepository: MessageRepository) {
    //     this.messageRepository = messagesRepository;
    // }

    constructor(private readonly messageRepository: MessageRepository) { }

    findOne(id: string) {
        return this.messageRepository.findOne(id);
    }

    findAll() {
        return this.messageRepository.findAll();
    }

    async create(content: string) {
        const id = await this.messageRepository.create(content);
        return this.messageRepository.findOne(id.toString());
    }
}