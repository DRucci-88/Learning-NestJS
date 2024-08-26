import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('/signup')
    createUser(
        @Body() body: CreateUserDto
    ): Promise<User> {
        const { email, password }: CreateUserDto = body;
        console.log(body);
        // return body;

        return this.userService.create(email, password);
    }
}

