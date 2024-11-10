/*
  Warnings:

  - Added the required column `fileName` to the `Intensity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Intensity" ADD COLUMN     "fileName" TEXT NOT NULL;
