import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [PrismaModule, EmailModule],
})
export class ReportModule {}
