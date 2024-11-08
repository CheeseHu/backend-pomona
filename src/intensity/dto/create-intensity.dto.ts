import { ApiProperty } from '@nestjs/swagger';

export class CreateIntensityDto {
  @ApiProperty({ required: true })
  labelId: number;

  @ApiProperty({ required: false })
  systemTemp: number;

  @ApiProperty({ required: false })
  detectorTemp: number;

  @ApiProperty({ required: false })
  humidity: number;

  @ApiProperty({ required: false })
  lampPD: number;

  @ApiProperty({ type: [Number], required: false })
  wavelength: number[];

  @ApiProperty({ type: [Number], required: false })
  absorbance: number[];

  @ApiProperty({ type: [Number], required: false })
  referenceSignal: number[];

  @ApiProperty({ type: [Number], required: false })
  sampleSignal: number[];
}
