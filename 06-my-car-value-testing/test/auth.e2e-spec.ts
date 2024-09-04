import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dtos/create-user.dto';
import { appSetup } from '../src/app-setup';

describe('Authentication System', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        appSetup(app);
        await app.init();
    });

    it('signup request', () => {
        const user: CreateUserDto = {
            hobby: 'membajak sawah',
            email: 'rucco2@gmail.com',
            password: 'rucco2',
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
