import { ConflictException, Inject, Injectable } from '@nestjs/common';

// Repositories
import { UserRepository } from '@modules/auth/domain/repositories';

// Models
import type { CreateUser, UserModel } from '@modules/auth/domain/models';
import type { SignupUseCase } from '@modules/auth/domain/usecases';

@Injectable()
export class SignupService implements SignupUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(data: CreateUser): Promise<UserModel> {
    const isEmailAvailable = await this.userRepository.findByEmail(data.email);

    if (!!isEmailAvailable) {
      throw new ConflictException('Email already in use');
    }

    return this.userRepository.create(data);
  }
}
