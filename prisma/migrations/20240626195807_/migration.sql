/*
  Warnings:

  - You are about to drop the column `color` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "color";

-- CreateTable
CREATE TABLE "TagColor" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagColor_userId_tagId_key" ON "TagColor"("userId", "tagId");

-- AddForeignKey
ALTER TABLE "TagColor" ADD CONSTRAINT "TagColor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagColor" ADD CONSTRAINT "TagColor_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
