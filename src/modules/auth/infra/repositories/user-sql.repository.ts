import type { PrismaProvider } from '@common/database/providers';
import type { CreateUser, UserModel } from '@modules/auth/domain/models';
import type { UserRepository } from '@modules/auth/domain/repositories';

export class UserSQLRepository implements UserRepository {
  constructor(private readonly prisma: PrismaProvider) {}

  public async create(data: CreateUser): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }
}
