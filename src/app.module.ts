import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { IntensitiesModule } from './intensity/intensity.module';
import { LabelsModule } from './label/label.module';
import { PklModelModule } from './model/model.module';
import { EmailModule } from './email/email.module';
import { ReportModule } from './report/report.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads', // This will serve static files at localhost:3333/uploads
    }),
    PrismaModule,
    IntensitiesModule,
    LabelsModule,
    PklModelModule,
    EmailModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
