import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { IntensitiesModule } from './intensity/intensity.module';
import { LabelsModule } from './label/label.module';
import { PklModelModule } from './model/model.module';

@Module({
  imports: [PrismaModule, IntensitiesModule, LabelsModule, PklModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
