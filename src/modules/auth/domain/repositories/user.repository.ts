import type { CreateUser, UserModel } from '../models';

export abstract class UserRepository {
  public abstract create(data: CreateUser): Promise<UserModel>;
  public abstract findByEmail(email: string): Promise<UserModel | null>;
}
