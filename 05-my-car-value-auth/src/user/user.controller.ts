import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { FindByEmailUserDto } from './dtos/find-by-email-user.dto';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dtos/signin-user.dto';

@Serialize(UserDto)
@Controller('auth')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('/signup')
    createUser(@Body() body: CreateUserDto): Promise<User> {
        const { hobby, email, password }: CreateUserDto = body;
        console.log(body);
        return this.authService.signup(hobby, email, password);
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

    @Post('/signin')
    signin(@Body() body: SigninUserDto): Promise<User> {
        const { email, password } = body;
        return this.authService.signin(email, password);
    }

    @Get('/:id') // even though id is number inside our database, Nest will automatically parse into string
    findUser(@Param('id') id: string) {
        console.log('handler is running');
        return this.userService.findOne(Number.parseInt(id));
    }

    @Get()
    // findAllUsers(@Query('email') email: string)
    findAllUsers(@Query() queryParam: FindByEmailUserDto) {
        console.log(queryParam);
        return this.userService.find(queryParam.email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(Number.parseInt(id), body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(Number.parseInt(id));
    }
}
