/*
  Warnings:

  - You are about to drop the `TagOnWorkdays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagOnWorkdays" DROP CONSTRAINT "TagOnWorkdays_tagName_fkey";

-- DropForeignKey
ALTER TABLE "TagOnWorkdays" DROP CONSTRAINT "TagOnWorkdays_workdayId_fkey";

-- DropTable
DROP TABLE "TagOnWorkdays";

-- CreateTable
CREATE TABLE "_TagToWorkday" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWorkday_AB_unique" ON "_TagToWorkday"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWorkday_B_index" ON "_TagToWorkday"("B");

-- AddForeignKey
ALTER TABLE "_TagToWorkday" ADD CONSTRAINT "_TagToWorkday_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWorkday" ADD CONSTRAINT "_TagToWorkday_B_fkey" FOREIGN KEY ("B") REFERENCES "Workday"("id") ON DELETE CASCADE ON UPDATE CASCADE;
