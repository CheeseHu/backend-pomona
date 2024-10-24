import { ApiProperty } from '@nestjs/swagger';
import { Intensity } from '@prisma/client';

export class IntensityEntity implements Intensity {
  id: number;
  labelId: number;
  headerVersion: string;
  systemTemp: number;
  detectorTemp: number;
  humidity: number;
  lampPD: number;
  shiftVectorCoefficients: number[];
  pixelWavelengthCoefficients: number[];
  serialNumber: number;
  scanConfigName: string;
  scanConfigType: string;
  startWavelength: number;
  endWavelength: number;
  patternPixelWidth: number;
  exposure: number;
  digitalResolution: number;
  numRepeats: number;
  pgaGain: number;
  totalMeasurementTimeSec: number;
  wavelength: number[];
  absorbance: number[];
  referenceSignal: number[];
  sampleSignal: number[];
  createdAt: Date;
  updatedAt: Date;
}
