import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user.service';
import { User } from '../user.entity';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        // next is a reference to the next middleware that we might have in the chain of middleware
        const { id } = req.session || {};

        if (id) {
            const user: User = await this.userService.findOne(id);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.currentUser = user;
        }
        next();
    }
}
