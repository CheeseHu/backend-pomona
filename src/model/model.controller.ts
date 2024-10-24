import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PklModelService } from './model.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('PklModel')
@ApiTags('PklModel')
export class PklModelController {
  constructor(private readonly pklModelService: PklModelService) {}

  @Post('store-from-server')
  async storeFileFromServer(): Promise<void> {
    await this.pklModelService.storePklFileFromServer();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a model by id' })
  findOne(@Param('id') id: string) {
    return this.pklModelService.getPklModel(+id);
  }
}
