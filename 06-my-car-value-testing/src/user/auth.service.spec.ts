import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';

let authService: AuthService;

describe('AuthService', () => {
    beforeEach(async () => {
        // Create testing DI Container
        // and some fake implementation of some other classes

        // Create a fake copy of the user service
        const fakeUserService: Partial<UserService> = {
            find: () => Promise.resolve([]),
            create: (hobby: string, email: string, password: string) =>
                Promise.resolve({ id: 1, hobby, email, password } as User),
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
});
