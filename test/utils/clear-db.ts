import { Logger } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';

export const clearDB = async (prisma: PrismaClient): Promise<void> => {
  const logger = new Logger('CLEAR_DB');
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    logger.error({ error });
  }
};
