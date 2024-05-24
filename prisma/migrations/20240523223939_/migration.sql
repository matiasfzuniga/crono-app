/*
  Warnings:

  - The primary key for the `TagOnWorkdays` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagId` on the `TagOnWorkdays` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagName` to the `TagOnWorkdays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TagOnWorkdays" DROP CONSTRAINT "TagOnWorkdays_tagId_fkey";

-- AlterTable
ALTER TABLE "TagOnWorkdays" DROP CONSTRAINT "TagOnWorkdays_pkey",
DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "TagOnWorkdays_pkey" PRIMARY KEY ("workdayId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "TagOnWorkdays" ADD CONSTRAINT "TagOnWorkdays_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
