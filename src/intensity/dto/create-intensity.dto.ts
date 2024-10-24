import { ApiProperty } from '@nestjs/swagger';

export class CreateIntensityDto {
  @ApiProperty({ required: true })
  labelId: number;

  @ApiProperty({ required: false })
  headerVersion: string;

  @ApiProperty({ required: false })
  systemTemp: number;

  @ApiProperty({ required: false })
  detectorTemp: number;

  @ApiProperty({ required: false })
  humidity: number;

  @ApiProperty({ required: false })
  lampPD: number;

  @ApiProperty({ type: [Number], required: false })
  shiftVectorCoefficients: number[];

  @ApiProperty({ type: [Number], required: false })
  pixelWavelengthCoefficients: number[];

  @ApiProperty({ required: false })
  serialNumber: number;

  @ApiProperty({ required: false })
  scanConfigName: string;

  @ApiProperty({ required: false })
  scanConfigType: string;

  @ApiProperty({ required: false })
  startWavelength: number;

  @ApiProperty({ required: false })
  endWavelength: number;

  @ApiProperty({ required: false })
  patternPixelWidth: number;

  @ApiProperty({ required: false })
  exposure: number;

  @ApiProperty({ required: false })
  digitalResolution: number;

  @ApiProperty({ required: false })
  numRepeats: number;

  @ApiProperty({ required: false })
  pgaGain: number;

  @ApiProperty({ required: false })
  totalMeasurementTimeSec: number;

  @ApiProperty({ type: [Number], required: false })
  wavelength: number[];

  @ApiProperty({ type: [Number], required: false })
  absorbance: number[];

  @ApiProperty({ type: [Number], required: false })
  referenceSignal: number[];

  @ApiProperty({ type: [Number], required: false })
  sampleSignal: number[];
}
