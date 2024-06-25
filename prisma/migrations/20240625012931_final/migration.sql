/*
  Warnings:

  - Added the required column `color` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Workday` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkdayStatus" AS ENUM ('complete', 'incomplete', 'exceeded');

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workday" DROP COLUMN "status",
ADD COLUMN     "status" "WorkdayStatus" NOT NULL;

-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "items" TEXT[],

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ToDoToWorkday" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ToDoToWorkday_AB_unique" ON "_ToDoToWorkday"("A", "B");

-- CreateIndex
CREATE INDEX "_ToDoToWorkday_B_index" ON "_ToDoToWorkday"("B");

-- AddForeignKey
ALTER TABLE "_ToDoToWorkday" ADD CONSTRAINT "_ToDoToWorkday_A_fkey" FOREIGN KEY ("A") REFERENCES "ToDo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ToDoToWorkday" ADD CONSTRAINT "_ToDoToWorkday_B_fkey" FOREIGN KEY ("B") REFERENCES "Workday"("id") ON DELETE CASCADE ON UPDATE CASCADE;
