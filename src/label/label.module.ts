import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';

@Module({
  controllers: [LabelController],
  providers: [LabelService],
  imports: [PrismaModule],
})
export class LabelsModule {}
