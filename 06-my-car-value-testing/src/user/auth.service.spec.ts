import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
    let authService: AuthService;
    let fakeUserService: Partial<UserService>;

    let fakeUser: User;

    beforeEach(async () => {
        // Create testing DI Container
        // and some fake implementation of some other classes

        fakeUser = {
            id: 1,
            hobby: 'Ternak Lele',
            email: 'le@gmail.com',
            password: 'le',
        } as User;

        const faksUsers: User[] = [];

        // Create a fake copy of the user service
        fakeUserService = {
            find: (email: string) => {
                const filteredUser = faksUsers.filter(
                    (user) => user.email === email,
                );
                return Promise.resolve(filteredUser);
            },
            create: (hobby: string, email: string, password: string) => {
                const user: User = { id: 1, hobby, email, password } as User;
                faksUsers.push(user);
                return Promise.resolve(user);
            },
        };

        // Create the module
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: fakeUserService,
                },
            ],
        }).compile();

        // DI Container will create a new instance with all of its different dependencies already initialized
        authService = module.get(AuthService);
    });

    it('can create an instance of auth service', async () => {
        expect(authService).toBeDefined();
    });

    it('creates a new user with salted and hashed password', async () => {
        const password = 'lepassword';
        const user = await authService.signup(
            'ternak lele',
            'le@gmail.com',
            password,
        );

        expect(user.password).not.toEqual(password);
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
    it('throws an error if the user signs up with email that already in use', async () => {
        fakeUserService.find = () => Promise.resolve([fakeUser]);
        try {
            await authService.signup(
                'menggali sumur',
                'hesoyam@gmail.com',
                'hesoyam',
            );
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('Email already in use');
        }
    });
    it('throws if signin is called with an unused email', async () => {
        try {
            await authService.signin('hesoyam@gmail.com', 'hesoyam');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toBe('User not found');
        }
    });
    it('user can signup and signin', async () => {
        const userSignup = await authService.signup(
            fakeUser.hobby,
            fakeUser.email,
            fakeUser.password,
        );
        expect(userSignup).toBeDefined();
        const userSignin = await authService.signin(
            fakeUser.email,
            fakeUser.password,
        );
        expect(userSignin).toBeDefined();
    });
    it('throws if an invalid password is provided', async () => {
        try {
            const userSignup = await authService.signup(
                fakeUser.hobby,
                fakeUser.email,
                fakeUser.password,
            );
            expect(userSignup).toBeDefined();
            await authService.signin(fakeUser.email, 'mueheehehhehe');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe('Wrong credentials');
        }
    });
});
