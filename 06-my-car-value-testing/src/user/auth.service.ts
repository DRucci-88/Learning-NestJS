import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async signup(hobby: string, email: string, password: string) {
        // Seed if email is in use
        const users = await this.userService.find(email);

        if (users.length) throw new BadRequestException('Email already in use');

        // Hash the user password
        // Generate a salt
        const salt = randomBytes(8).toString('hex'); // Generate 8 bytes and convert to HEX, so it have a 16 character

        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 characters

        // Join the hased result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Creeate a new user and save it
        const user = await this.userService.create(hobby, email, result);

        // return the user
        return user;
    }

    async signin(email: string, password: string) {
        const users = await this.userService.find(email);

        if (users.length === 0) throw new NotFoundException('User not found');

        const user = users[0];

        const salt: string = user.password.split('.')[0];

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        if (result !== user.password)
            throw new BadRequestException('Wrong credentials');

        return user;
    }
}
