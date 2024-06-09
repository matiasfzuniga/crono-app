/*
  Warnings:

  - Added the required column `status` to the `Workday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workday" ADD COLUMN     "status" TEXT NOT NULL;
