import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, ClassConstructor } from 'class-transformer';

// Decorator
export function Serialize<T>(dto: ClassConstructor<T>) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor<T> implements NestInterceptor {
    constructor(private dto: ClassConstructor<T>) {}
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<T> | Promise<Observable<T>> {
        // Run something before a request is handled by the request handler
        // console.log('I am running before the handler', context);
        // throw new Error('Method not implemented.');
        return next.handle().pipe(
            map((data: T) => {
                // Run something before the response is sent out
                // console.log('I am running before response is sent out', data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true, // make sure everything works as expected within properties of DTO
                });
            }),
        );
    }
}
