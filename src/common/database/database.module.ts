import { Global, Module } from '@nestjs/common';
import { PrismaProvider } from './providers';

@Global()
@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class DatabaseModule {}
