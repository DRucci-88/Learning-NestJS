import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';

it('can create an instance of auth service', async () => {
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
    const authServive = module.get(AuthService);

    expect(authServive).toBeDefined();
});
