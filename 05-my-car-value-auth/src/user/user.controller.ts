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
    UseGuards,
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
import { ICookieSession } from 'src/main';
import { CurrentUser } from './decorator/current-user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    // @Get('current-user')
    // currentUser(@Session() session: ICookieSession) {
    //     return this.userService.findOne(session.id);
    // }

    @Get('current-user')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(
        @Body() body: CreateUserDto,
        @Session() session: any,
    ): Promise<User> {
        const { hobby, email, password }: CreateUserDto = body;
        console.log(body);
        const user = await this.authService.signup(hobby, email, password);
        console.log(session);
        const userCookieSession: ICookieSession = {
            id: user.id,
            email: user.email,
        };
        session.id = userCookieSession.id;
        session.email = userCookieSession.email;
        console.log(session);
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        console.log(session);
        session.color = null;
        session.id = null;
        session.email = null;
        console.log(session);
    }

    @Post('/signin')
    async signin(
        @Body() body: SigninUserDto,
        @Session() session: any,
    ): Promise<User> {
        const { email, password } = body;
        const user = await this.authService.signin(email, password);
        const userCookieSession: ICookieSession = {
            id: user.id,
            email: user.email,
        };
        console.log(session);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        session.id = userCookieSession.id;
        session.email = userCookieSession.email;
        console.log(session);
        return user;
    }

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
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
