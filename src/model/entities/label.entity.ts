import { ApiProperty } from '@nestjs/swagger';
import { Label } from '@prisma/client';

export class LabelEntity implements Label {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
