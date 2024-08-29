import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/user/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
        // Run something before a request is handled by the request handler
        console.log('I am running before the handler', context);
        // throw new Error('Method not implemented.');
        return next.handle().pipe(
            map((data: any) => {
                // Run something before the response is sent out
                console.log('I am running before response is sent out', data);
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true, // make sure everything works as expected within properties of DTO
                });
            })
        );
    }

}