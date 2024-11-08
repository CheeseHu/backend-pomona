import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
  imports: [PrismaModule],
})
export class EmailModule {}
