import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntensitiesController } from './intensity.controller';
import { IntensitiesService } from './intensity.service';

@Module({
  controllers: [IntensitiesController],
  providers: [IntensitiesService],
  imports: [PrismaModule],
})
export class IntensitiesModule {}
