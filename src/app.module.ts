import { Module } from '@nestjs/common';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [DatabaseModule, LoggerModule, ConfigModule],
})
export class AppModule {}
