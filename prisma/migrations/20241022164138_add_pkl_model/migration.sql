-- CreateTable
CREATE TABLE "PklModel" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "file" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PklModel_pkey" PRIMARY KEY ("id")
);
