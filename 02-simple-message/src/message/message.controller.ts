import {
    Controller,     // class decorator
    Get, Post,      // method decorator
    Body, Param,    // argument decorator
} from '@nestjs/common';

import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
    @Get()
    listMessages() {
        return [
            'hi', 'kamu', 'ganteng', 'banget'
        ];
    }

    @Post()
    createMessages(
        @Body() body: CreateMessageDto
    ) {
        console.log(body);
        console.log(body.content);
        return body;
    }

    @Get('/:id')
    getMessage(
        @Param('id') id: string
    ) {
        console.log(id);
        return id;
    }
}
