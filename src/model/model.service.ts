import { Injectable } from '@nestjs/common';
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

    // Assuming your model table has a bytea column
    const filename = path.basename(filePath);
    console.log(fileBuffer);

    return this.prisma.pklModel.create({
      data: {
        filename,
        file: fileBuffer,
      },
    });
  }

  async getPklModel(id: number): Promise<void> {
    const file = await this.prisma.pklModel.findFirst({ where: { id } });
    const buffer = file.file; // Your buffer data here

    // Define the file path for the output .pkl file
    const filePath = path.join(process.cwd(), 'src/model/output_model.pkl');

    // Write the buffer to a .pkl file
    fs.writeFileSync(filePath, buffer);

    console.log('File has been saved');
  }
}
