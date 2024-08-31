import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly userService: UserService) {}
    async intercept(
        context: ExecutionContext, // Wrapper around the incoming request
        next: CallHandler<any>, // reference to the actual route handler that run at some point in time
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { id } = request.session || {};

        if (!id) return next.handle();

        const user = await this.userService.findOne(id);

        // We brough user object to ExecutionContext, that custome decorator will get user object from it
        request.currentUser = user;
        return next.handle();
    }
}
