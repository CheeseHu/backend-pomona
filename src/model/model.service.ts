import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PklModelService {
  constructor(private prisma: PrismaService) {}

  async storePklFileFromServer(): Promise<any> {
    const filePath = path.join(process.cwd(), 'src/model/svm_model.pkl');

    // Read the .pkl file from the server
    const fileBuffer = fs.readFileSync(filePath);

    // Assuming model table has a bytea column
    const filename = path.basename(filePath);
    console.log(fileBuffer);

    return this.prisma.pklModel.create({
      data: {
        filename,
        file: fileBuffer,
      },
    });
  }

  async getPklModel(id: number): Promise<{ data: any }> {
    const file = await this.prisma.pklModel.findFirst({ where: { id } });
    const buffer = file.file;
    return { data: buffer };
  }

  async getPklLatesModel(): Promise<{ data: any }> {
    const latestModel = await this.prisma.pklModel.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (latestModel) {
      const buffer = latestModel.file;
      return { data: buffer };
    } else {
      throw new NotFoundException(`Model was not found`);
    }
  }

  async countModel(): Promise<{ count: number }> {
    const count = await this.prisma.pklModel.count();
    return { count };
  }
}
