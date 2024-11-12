import { ApiProperty } from '@nestjs/swagger';

export class PredictDto {
  @ApiProperty()
  type: number;

  @ApiProperty({ type: [Number], required: true })
  signal: number[];
}
