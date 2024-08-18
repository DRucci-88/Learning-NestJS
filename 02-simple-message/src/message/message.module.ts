import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';

@Module({
    controllers: [MessageController],
    providers: [    // Things that can be used as dependencies for other classes
        MessageService,
        MessageRepository,
    ],
})
export class MessageModule { }
