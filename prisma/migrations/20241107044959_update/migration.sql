/*
  Warnings:

  - You are about to drop the column `digitalResolution` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `exposure` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `headerVersion` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `numRepeats` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `patternPixelWidth` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `pgaGain` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `pixelWavelengthCoefficients` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `scanConfigName` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `scanConfigType` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `shiftVectorCoefficients` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `totalMeasurementTimeSec` on the `Intensity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Intensity" DROP COLUMN "digitalResolution",
DROP COLUMN "exposure",
DROP COLUMN "headerVersion",
DROP COLUMN "numRepeats",
DROP COLUMN "patternPixelWidth",
DROP COLUMN "pgaGain",
DROP COLUMN "pixelWavelengthCoefficients",
DROP COLUMN "scanConfigName",
DROP COLUMN "scanConfigType",
DROP COLUMN "serialNumber",
DROP COLUMN "shiftVectorCoefficients",
DROP COLUMN "totalMeasurementTimeSec",
ADD COLUMN     "endAbsorbance" DOUBLE PRECISION,
ADD COLUMN     "startAbsorbance" DOUBLE PRECISION;
