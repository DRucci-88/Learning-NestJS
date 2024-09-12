import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../user.service';
import { User } from '../user.entity';

// This is going to update or add an additional property to an existing interface
declare module 'express-serve-static-core' {
    interface Request {
        currentUser?: Partial<User>;
    }
}

/**
 * Changing original types is a bad practice.
 * Also es-lint does not like namespaces as new TS versions prefer modules over namespaces due to speed.
 * Instead you can extend the existing Request interface by adding additional properties by defining new type as show on the example below.
 * Latter by exporting this new type you can use it across your application.
 */

// type AppRequest = Request & {
//     currentUser?: Partial<User>;
//     session: {
//         userId?: number;
//     };
// };

/**
 * The error you're encountering is due to ESLint's preference for using ES2015 (ES6) module syntax rather than namespaces.
 * In modern JavaScript/TypeScript development, ES2015 modules (import/export) are favored over the use of namespaces,
 * as namespaces are more of a legacy feature in TypeScript.
 */

// declare global {
//     namespace Express {
//         interface Request {
//             currentUser?: User;
//         }
//     }
// }

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        // next is a reference to the next middleware that we might have in the chain of middleware
        const { id } = req.session || {};

        if (id) {
            const user: User = await this.userService.findOne(id);
            req.currentUser = user;
        }
        next();
    }
}
