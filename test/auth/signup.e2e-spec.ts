import * as request from 'supertest';

import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

// Modules
import { AppModule } from '../../src/app.module';

// Providers
import { PrismaProvider } from '@common/database/providers';

// Models
import type { UserModel } from '@modules/auth/domain/models';
import type {
  SignupInputDto,
  SignupOutputDto,
} from '@modules/auth/infra/http/dtos';

// Helpers
import { clearDB, setupValidationPipe } from '@test/utils';

describe('POST /v1/auth/signup', () => {
  let app: INestApplication;
  let prisma: PrismaProvider;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setupValidationPipe(app);

    await app.init();

    prisma = moduleFixture.get<PrismaProvider>(PrismaProvider);
  });

  afterAll(async () => {
    await clearDB(prisma);
    await app.close();
  });

  it("should respond with 422 when 'name' is empty", async () => {
    const payload: SignupInputDto = {
      name: '',
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const { status, body } = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(payload);

    expect(status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(body).toEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: ['name should not be empty'],
      error: 'Unprocessable Entity',
    });
  });

  it("should respond with 422 when 'name' is not a string", async () => {
    const payload = {
      name: faker.number.int(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const { status, body } = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(payload);

    expect(status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(body).toEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: ['name must be a string'],
      error: 'Unprocessable Entity',
    });
  });

  it("should respond with 422 when 'name' is not a string", async () => {
    const payload: SignupInputDto = {
      name: faker.lorem.word(1),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const { status, body } = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(payload);

    expect(status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(body).toEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: ['name must be longer than or equal to 2 characters'],
      error: 'Unprocessable Entity',
    });
  });

  it("should respond with 422 when 'email' is not a valid email address", async () => {
    const payload: SignupInputDto = {
      name: faker.person.fullName(),
      email: faker.lorem.word(),
      password: faker.internet.password(),
    };
    const { status, body } = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(payload);

    expect(status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);

    expect(body).toEqual({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      message: ['email must be an email'],
      error: 'Unprocessable Entity',
    });
  });

  it('should register an user', async () => {
    const payload: SignupInputDto = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const { status, body } = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(payload);
    const registeredUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });

    expect(registeredUser).toEqual<UserModel>({
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      password: payload.password,
      name: payload.name,
      email: payload.email,
    });

    expect(status).toBe(HttpStatus.CREATED);

    expect(body).toEqual<Partial<SignupOutputDto>>({
      id: registeredUser.id,
      email: registeredUser.email,
      name: payload.name,
    });
  });
});
