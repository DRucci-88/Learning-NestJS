import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { FindByEmailUserDto } from './dtos/find-by-email-user.dto';

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
        const users: User[] = fakeUsers.filter((user) => user.email === email);
        return Promise.resolve(users);
      },
      // remove: () => {},
      // update: (id, content) => {},
    };

    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({
          id: fakeUser.id,
          email,
          password,
          hobby: 'Ternak Lele',
        } as User);
      },
    };

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
  it('findAllUsers with the given email', async () => {
    const param: FindByEmailUserDto = { email: fakeUser.email };
    const users = await controller.findAllUsers(param);
    expect(users).toBeDefined();
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(param.email);
  });
  it('findUser with the given id', async () => {
    const user = await controller.findUser(fakeUser.id.toString());
    expect(user).toBeDefined();
  });
  it('findUser throws an error if user the given id not found', async () => {
    try {
      await controller.findUser('2');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('User not found');
    }
  });
  it('signin updates session object and return users', async () => {
    const session = { id: -10 };
    const user = await controller.signin(
      {
        email: 'gak kepake',
        password: 'gak kepake',
      },
      session,
    );
    expect(user.id).toEqual(fakeUser.id);
    expect(session.id).toEqual(fakeUser.id);
  });
});
