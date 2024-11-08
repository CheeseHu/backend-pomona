import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'First image file',
  })
  file1: File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Second image file',
  })
  file2: File;
}
