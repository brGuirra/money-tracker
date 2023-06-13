import type { CreateUser, UserModel } from '@modules/auth/domain/models';
import { UserRepository } from '@modules/auth/domain/repositories';
import type { SignupUseCase } from '@modules/auth/domain/usecases';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignupService implements SignupUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(data: CreateUser): Promise<UserModel> {
    return this.userRepository.create(data);
  }
}
