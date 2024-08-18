import {
    Controller,     // class decorator
    Get, Post,      // method decorator
    Body, Param,    // argument decorator
    NotFoundException
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    // messageService: MessageService;

    // constructor() {
    //     // Serivce is creating its own dependencies
    //     // DONT DO THIS ON REAL APPS
    //     this.messageService = new MessageService();
    // }

    constructor(private readonly messageService: MessageService) { }

    @Get()
    listMessages() {
        return this.messageService.findAll();
        // return [
        //     'hi', 'kamu', 'ganteng', 'banget'
        // ];
    }

    @Post()
    createMessages(
        @Body() body: CreateMessageDto
    ) {
        return this.messageService.create(body.content);
        // console.log(body);
        // console.log(body.content);
        // return body;
    }

    @Get('/:id')
    async getMessage(
        @Param('id') id: string
    ) {
        const message = await this.messageService.findOne(id);

        if (!message) {
            throw new NotFoundException('message not found');
        }
        return message;
        // console.log(id);
        // return id;
    }
}
