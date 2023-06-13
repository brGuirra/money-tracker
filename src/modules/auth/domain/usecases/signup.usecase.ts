import type { CreateUser, UserModel } from '../models';

export abstract class SignupUseCase {
  public abstract execute(data: CreateUser): Promise<UserModel>;
}
