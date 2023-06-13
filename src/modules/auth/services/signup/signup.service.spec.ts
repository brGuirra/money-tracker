import { faker } from '@faker-js/faker';
import type { CreateUser, UserModel } from '@modules/auth/domain/models';
import { UserRepository } from '@modules/auth/domain/repositories';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { SignupService } from './signup.service';

describe('SigupService', () => {
  let service: SignupService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create an user and return its data', async () => {
    const data: CreateUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest
      .spyOn(userRepository, 'create')
      .mockImplementationOnce((data: CreateUser) =>
        Promise.resolve({
          ...data,
          id: faker.string.uuid(),
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        }),
      );

    expect(await service.execute(data)).toEqual<UserModel>(
      expect.objectContaining(data),
    );
  });

  it('should throw when Prisma throws', async () => {
    const data: CreateUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const error = new Error(faker.lorem.word());

    jest.spyOn(userRepository, 'create').mockRejectedValueOnce(error);

    await expect(service.execute(data)).rejects.toThrow(error);
  });
});
