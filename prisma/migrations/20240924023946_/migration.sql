/*
  Warnings:

  - You are about to drop the column `intensity` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `pga` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `reference` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `scanTime` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureDetector` on the `Intensity` table. All the data in the column will be lost.
  - You are about to drop the column `temperatureSystem` on the `Intensity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Intensity" DROP COLUMN "intensity",
DROP COLUMN "pga",
DROP COLUMN "reference",
DROP COLUMN "scanTime",
DROP COLUMN "temperatureDetector",
DROP COLUMN "temperatureSystem",
ADD COLUMN     "absorbance" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "detectorTemp" DOUBLE PRECISION,
ADD COLUMN     "digitalResolution" DOUBLE PRECISION,
ADD COLUMN     "endWavelength" DOUBLE PRECISION,
ADD COLUMN     "exposure" DOUBLE PRECISION,
ADD COLUMN     "lampPD" DOUBLE PRECISION,
ADD COLUMN     "numRepeats" DOUBLE PRECISION,
ADD COLUMN     "patternPixelWidth" DOUBLE PRECISION,
ADD COLUMN     "pgaGain" DOUBLE PRECISION,
ADD COLUMN     "pixelWavelengthCoefficients" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "referenceSignal" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "sampleSignal" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "scanConfigName" TEXT,
ADD COLUMN     "scanConfigType" TEXT,
ADD COLUMN     "serialNumber" DOUBLE PRECISION,
ADD COLUMN     "shiftVectorCoefficients" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
ADD COLUMN     "startWavelength" DOUBLE PRECISION,
ADD COLUMN     "systemTemp" DOUBLE PRECISION,
ADD COLUMN     "totalMeasurementTimeSec" DOUBLE PRECISION;
