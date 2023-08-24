import { Module } from '@nestjs/common';

// Controllers
import { SignupController } from './infra/http/controllers';

// Services
import { SignupService } from './services';

// Repositories
import { UserSQLRepository } from './infra/repositories';

// Models
import { SignupUseCase } from './domain/usecases';
import { UserRepository } from './domain/repositories';

@Module({
  providers: [
    {
      provide: SignupUseCase,
      useClass: SignupService,
    },
    {
      provide: UserRepository,
      useClass: UserSQLRepository,
    },
  ],
  controllers: [SignupController],
})
export class AuthModule {}
