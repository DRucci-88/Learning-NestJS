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
        const user = this.userRepo.create({ email, password });

        return this.userRepo.save(user);
    }
}
