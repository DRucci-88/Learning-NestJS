import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dtos/create-user.dto';

describe('Authentication System', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('signup request', () => {
        const user: CreateUserDto = {
            hobby: 'membajak sawah',
            email: 'rucco3@gmail.com',
            password: 'rucco3',
        };
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(user)
            .expect(201)
            .then((res: request.Response) => {
                const { id, hobby, email } = res.body;
                expect(id).toBeDefined();
                expect(hobby).toEqual(user.hobby);
                expect(email).toEqual(user.email);
            });
    });
});
