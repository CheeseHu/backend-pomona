import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PklModelService } from './model.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('PklModel')
@ApiTags('PklModel')
export class PklModelController {
  constructor(private readonly pklModelService: PklModelService) {}

  @Post('train')
  async storeFileFromServer(): Promise<void> {
    await this.pklModelService.storePklFileFromServer();
  }

  @Get('count')
  @ApiOperation({ summary: 'Count number of models' })
  count() {
    return this.pklModelService.countModel();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get the latest model' })
  findLatest(): Promise<{ data: any }> {
    return this.pklModelService.getPklLatesModel();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a model by id' })
  findOne(@Param('id') id: string): Promise<{ data: any }> {
    return this.pklModelService.getPklModel(+id);
  }
}
