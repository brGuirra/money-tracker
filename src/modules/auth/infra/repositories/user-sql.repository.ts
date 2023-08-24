import { Inject } from '@nestjs/common';

// Providers
import { PrismaProvider } from '@common/database/providers';

// Models
import type { CreateUser, UserModel } from '@modules/auth/domain/models';
import type { UserRepository } from '@modules/auth/domain/repositories';

export class UserSQLRepository implements UserRepository {
  constructor(
    @Inject(PrismaProvider)
    private readonly prisma: PrismaProvider,
  ) {}

  public async create(data: CreateUser): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    console.log('<<<<<<CHECOU AQUI>>>>>>');
    console.log(`PRISMA: ${this.prisma}`);
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
