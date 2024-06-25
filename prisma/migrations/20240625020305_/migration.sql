/*
  Warnings:

  - You are about to drop the column `name` on the `ToDo` table. All the data in the column will be lost.
  - You are about to drop the `_ToDoToWorkday` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workdayId]` on the table `ToDo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ToDoToWorkday" DROP CONSTRAINT "_ToDoToWorkday_A_fkey";

-- DropForeignKey
ALTER TABLE "_ToDoToWorkday" DROP CONSTRAINT "_ToDoToWorkday_B_fkey";

-- AlterTable
ALTER TABLE "ToDo" DROP COLUMN "name",
ADD COLUMN     "workdayId" INTEGER;

-- DropTable
DROP TABLE "_ToDoToWorkday";

-- CreateIndex
CREATE UNIQUE INDEX "ToDo_workdayId_key" ON "ToDo"("workdayId");

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_workdayId_fkey" FOREIGN KEY ("workdayId") REFERENCES "Workday"("id") ON DELETE SET NULL ON UPDATE CASCADE;
