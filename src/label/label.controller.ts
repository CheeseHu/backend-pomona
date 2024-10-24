import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLableDto } from './dto/update-label.dto';
import { LabelEntity } from './entities/label.entity';

@Controller('label')
@ApiTags('label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  @ApiCreatedResponse({ type: LabelEntity })
  @ApiOperation({ summary: 'Create a new label'})
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Get()
  @ApiOkResponse({ type: LabelEntity, isArray: true })
  @ApiOperation({ summary: 'Get all labels'})
  findAll() {
    return this.labelService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: LabelEntity })
  @ApiOperation({ summary: 'Get a label by id'})
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: LabelEntity })
  @ApiOperation({ summary: 'Edit label by id'})
  update(@Param('id') id: string, @Body() updateLableDto: UpdateLableDto) {
    return this.labelService.update(+id, updateLableDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: LabelEntity })
  @ApiOperation({ summary: 'Delete label by id'})
  remove(@Param('id') id: string) {
    return this.labelService.remove(+id);
  }
}
