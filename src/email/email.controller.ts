import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(): Promise<void> {
    await this.emailService.sendEmail('MEAT with Drug Detected');
  }
}
