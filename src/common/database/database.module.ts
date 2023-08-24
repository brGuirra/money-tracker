import { Global, Module } from '@nestjs/common';

// Providers
import { PrismaProvider } from './providers';

@Global()
@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class DatabaseModule {}
