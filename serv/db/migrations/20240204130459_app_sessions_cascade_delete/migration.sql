-- DropForeignKey
ALTER TABLE "AppSession" DROP CONSTRAINT "AppSession_userId_fkey";

-- AddForeignKey
ALTER TABLE "AppSession" ADD CONSTRAINT "AppSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
