import { ApiProperty } from '@nestjs/swagger';
import { Intensity } from '@prisma/client';

export class IntensityEntity implements Intensity {
  id: number;
  fileName: string;
  labelId: number;
  typeId: number;
  systemTemp: number;
  detectorTemp: number;
  humidity: number;
  lampPD: number;
  startWavelength: number;
  endWavelength: number;
  startAbsorbance: number;
  endAbsorbance: number;
  wavelength: number[];
  absorbance: number[];
  referenceSignal: number[];
  sampleSignal: number[];
  createdAt: Date;
  updatedAt: Date;
}
