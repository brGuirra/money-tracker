import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from './common/config/config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ConfigModule, AuthModule],
})
export class AppModule {}
