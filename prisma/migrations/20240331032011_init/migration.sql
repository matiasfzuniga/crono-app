/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JornadaToTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Jornada` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_JornadaToTags" DROP CONSTRAINT "_JornadaToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_JornadaToTags" DROP CONSTRAINT "_JornadaToTags_B_fkey";

-- AlterTable
ALTER TABLE "Jornada" ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_JornadaToTags";
