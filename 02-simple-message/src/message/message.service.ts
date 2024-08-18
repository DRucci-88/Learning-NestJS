import { MessageRepository } from "./message.repository";

export class MessageService {
    messageRepository: MessageRepository;

    constructor() {
        // Serivce is creating its own dependencies
        // DONT DO THIS ON REAL APPS
        this.messageRepository = new MessageRepository();
    }

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