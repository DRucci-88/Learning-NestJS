import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let fakeUserService: Partial<UserService>;
    let fakeAuthService: Partial<AuthService>;

    const fakeUser = {
        id: 1,
        hobby: 'Ternak Lele',
        email: 'le@gmail.com',
        password: 'le',
    } as User;

    beforeEach(async () => {
        const fakeUsers: User[] = [fakeUser];
        fakeUserService = {
            findOne: (id: number | null) => {
                const user: User = fakeUsers.find((user) => user.id === id);
                if (!user) throw new NotFoundException('User not found');
                return Promise.resolve(user);
            },
            find: (email: string) => {
                const users: User[] = fakeUsers.filter(
                    (user) => user.email === email,
                );
                return Promise.resolve(users);
            },
            // remove: () => {},
            // update: (id, content) => {},
        };

        fakeAuthService = {};

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: fakeUserService },
                { provide: AuthService, useValue: fakeAuthService },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
