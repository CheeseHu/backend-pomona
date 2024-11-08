import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntensitiesController } from './intensity.controller';
import { IntensitiesService } from './intensity.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [IntensitiesController],
  providers: [IntensitiesService],
  imports: [PrismaModule, EmailModule],
})
export class IntensitiesModule {}
