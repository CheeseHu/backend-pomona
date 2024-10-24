import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { IntensitiesService } from './intensity.service';
import { CreateIntensityDto } from './dto/create-intensity.dto';
import { UpdateIntensityDto } from './dto/update-intensity.dto';
import { IntensityEntity } from './entities/intensity.entity';
import { WithPagination } from 'src/common/types/with-pagination';

@Controller('intensities')
@ApiTags('intensities')
export class IntensitiesController {
  constructor(private readonly intensitiesService: IntensitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new intensity record' })
  @ApiCreatedResponse({ type: IntensityEntity })
  async create(@Body() createIntensityDto: CreateIntensityDto) {
    return this.intensitiesService.create(createIntensityDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all intensity records'})
  // @ApiOkResponse({ type: IntensityEntity, isArray: true })
  // async findAll(): Promise<WithPagination<IntensityEntity[]>> {
  //   return this.intensitiesService.findAll();
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Get one detail intensity record by id' })
  @ApiOkResponse({ type: IntensityEntity })
  async findOne(@Param('id') id: string): Promise<IntensityEntity> {
    return this.intensitiesService.findOne(+id);
  }

  // @Patch(':id')
  // @ApiOkResponse({ type: IntensityEntity })
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateIntensityDto: UpdateIntensityDto,
  // ): Promise<IntensityEntity> {
  //   return this.intensitiesService.update(+id, updateIntensityDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete intensity record by id' })
  @ApiOkResponse({ type: IntensityEntity })
  async remove(@Param('id') id: string) {
    return this.intensitiesService.remove(+id);
  }
}
