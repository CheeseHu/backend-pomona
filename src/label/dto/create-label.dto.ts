import { ApiProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiProperty()
  name: string;
}
