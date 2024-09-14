import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dtos/create-user.dto';
import { UserDto } from 'src/user/dtos/user.dto';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('signup request', async () => {
    console.log('signup request');
    const fakeUser: CreateUserDto = {
      hobby: 'membajak sawah',
      email: 'rucco@gmail.com',
      password: 'rucco',
    };
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(fakeUser)
      .expect(201)
      .then((res: request.Response) => {
        const { id, hobby, email } = res.body;
        expect(id).toBeDefined();
        expect(hobby).toEqual(fakeUser.hobby);
        expect(email).toEqual(fakeUser.email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    console.log('signup as a new user then get the currently logged in user');
    const fakeUser: CreateUserDto = {
      hobby: 'membajak sawah',
      email: 'rucco@gmail.com',
      password: 'rucco',
    };
    const res: request.Response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(fakeUser)
      .expect(201);
    console.log(res.body);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/current-user')
      .set('Cookie', cookie)
      .expect(200);
    const { id, hobby, email }: UserDto = body;
    expect(id).toBeDefined();
    expect(hobby).toEqual(fakeUser.hobby);
    expect(email).toEqual(fakeUser.email);
  });
});
