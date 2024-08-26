import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

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

    @Get('/:id')    // even though id is number inside our database, Nest will automatically parse into string
    findUser(
        @Param('id') id: string
    ) {
        return this.userService.findOne(Number.parseInt(id));
    }

    @Get()
    findAllUsers(
        @Query('email') email: string
    ) {
        return this.userService.find(email);
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: string,
        @Body() body: UpdateUserDto
    ) {
        return this.userService.update(
            Number.parseInt(id),
            body,
        );
    }

    @Delete('/:id')
    removeUser(
        @Param('id') id: string
    ) {
        return this.userService.remove(Number.parseInt(id));
    }
}

