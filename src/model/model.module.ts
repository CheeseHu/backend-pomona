import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PklModelController } from './model.controller';
import { PklModelService } from './model.service';

@Module({
  controllers: [PklModelController],
  providers: [PklModelService],
  imports: [PrismaModule],
})
export class PklModelModule {}
