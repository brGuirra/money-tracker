import { Module } from '@nestjs/common';
import { SignupUseCase } from './domain/usecases';
import { SignupController } from './infra/http/controllers';
import { SignupService } from './services';
import { UserRepository } from './domain/repositories';
import { UserSQLRepository } from './infra/repositories';

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
