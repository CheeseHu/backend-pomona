import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async saveImageData(filename: string, filePath: string) {
    return this.prisma.report.create({
      data: {
        filename,
        filePath,
      },
    });
  }

  async getAll() {
    return this.prisma.report.findMany();
  }
}