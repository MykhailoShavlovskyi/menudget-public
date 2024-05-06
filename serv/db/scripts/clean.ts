import { PrismaClient } from "@prisma/client"
import { clearBucket } from "../../s3/s3"

async function getTables(prisma: PrismaClient): Promise<string[]> {
  const results: { table_name: string }[] = await prisma.$queryRaw`
       SELECT table_name
       FROM information_schema.tables
       WHERE table_schema='public'
       AND table_type='BASE TABLE';
 `
  return results.map((v) => v.table_name)
}

async function dropAllTables(prisma: PrismaClient): Promise<void> {
  // for (const table of tables)
  await prisma.$executeRawUnsafe(`DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
END $$;`)
}

export async function clean() {
  console.info("Clearing file bucket")
  await clearBucket()
  console.info("Dropping all tables in the database...")
  const prisma = new PrismaClient()
  console.info(await getTables(prisma))
  await dropAllTables(prisma)
  console.info("Cleaned database successfully")
  await prisma.$disconnect()
}

export default clean()
