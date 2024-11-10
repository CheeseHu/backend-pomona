/*
  Warnings:

  - Added the required column `filePath_` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename_` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "filePath_" TEXT NOT NULL,
ADD COLUMN     "filename_" TEXT NOT NULL;
