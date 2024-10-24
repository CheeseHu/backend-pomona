-- CreateTable
CREATE TABLE "Intensity" (
    "id" SERIAL NOT NULL,
    "headerVersion" TEXT,
    "scanTime" TEXT,
    "temperatureSystem" DOUBLE PRECISION,
    "temperatureDetector" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "pga" DOUBLE PRECISION,
    "wavelength" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "intensity" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "reference" DOUBLE PRECISION[] DEFAULT ARRAY[]::DOUBLE PRECISION[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intensity_pkey" PRIMARY KEY ("id")
);
