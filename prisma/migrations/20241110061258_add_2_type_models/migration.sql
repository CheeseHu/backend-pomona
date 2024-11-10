/*
  Warnings:

  - You are about to drop the column `file` on the `PklModel` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `PklModel` table. All the data in the column will be lost.
  - Added the required column `file_svm` to the `PklModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_xgb` to the `PklModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename_svm` to the `PklModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename_xgb` to the `PklModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PklModel" DROP COLUMN "file",
DROP COLUMN "filename",
ADD COLUMN     "file_svm" BYTEA NOT NULL,
ADD COLUMN     "file_xgb" BYTEA NOT NULL,
ADD COLUMN     "filename_svm" TEXT NOT NULL,
ADD COLUMN     "filename_xgb" TEXT NOT NULL;
