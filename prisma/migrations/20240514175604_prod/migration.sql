-- AlterTable
ALTER TABLE "Jornada" ADD COLUMN     "userAuthorId" TEXT;

-- AddForeignKey
ALTER TABLE "Jornada" ADD CONSTRAINT "Jornada_userAuthorId_fkey" FOREIGN KEY ("userAuthorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
