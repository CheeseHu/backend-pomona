import { PartialType } from '@nestjs/swagger';
import { CreateIntensityDto } from './create-intensity.dto';

export class UpdateIntensityDto extends PartialType(CreateIntensityDto) {}
