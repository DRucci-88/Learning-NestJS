import {
    Controller,     // class decorator
    Get, Post,      // method decorator
    Body, Param,    // argument decorator
} from '@nestjs/common';

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
        @Body() body: any
    ) {
        console.log(body);
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
