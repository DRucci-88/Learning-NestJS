import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User> // Dependency Injection is not very good with Generic type, so need a Decorator to aid Dependency Injection
    ) { }

    create(email: string, password: string): Promise<User> {
        const user: User = this.userRepo.create({ email, password });
        // Why we bother to create a user entity file before save ?
        // Because we can make a validation to its entity
        // Just a make sure run a validation before data can store up to database
        // Also executed a Hooks inside entity
        console.log(user.id);

        return this.userRepo.save(user);
    }
}
