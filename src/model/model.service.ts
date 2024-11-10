import { Injectable, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import { json2csv } from 'json-2-csv';
import * as path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PklModelService {
  constructor(private prisma: PrismaService) {}
  // Function to convert camelCase to snake_case
  toSnakeCase(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  flattenArrayFields(objects) {
    return objects.map((obj) => {
      const flatObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (
            key === 'createdAt' ||
            key === 'updatedAt' ||
            key === 'startAbsorbance' ||
            key === 'endAbsorbance' ||
            key === 'startWavelength' ||
            key === 'endWavelength' ||
            key === 'labelId' ||
            key === 'typeId' ||
            key === 'id'
          ) {
            continue;
            // Skip these fields
          }
          if (Array.isArray(obj[key])) {
            obj[key].forEach((value, index) => {
              flatObj[`${this.toSnakeCase(key)}_${index + 1}`] = value;
            });
          } else {
            flatObj[this.toSnakeCase(key)] = obj[key];
          }
        }
      }
      return flatObj;
    });
  }

  async fetchAllData() {
    const pageSize = 100;
    // Number of rows per page
    let page = 0;
    let allData = [];
    while (true) {
      // Fetch a chunk of data
      const chunk = await this.prisma.intensity.findMany({
        skip: page * pageSize,
        take: pageSize,
      });
      // If no more data is returned, break the loop
      if (chunk.length === 0) {
        break;
      }
      // Append the chunk to the allData array
      allData = allData.concat(chunk);
      // Move to the next page
      page++;
    }
    return allData;
  }
  async storePklFileFromServer(): Promise<any> {
    const dataset = await this.fetchAllData();
    // Flatten the data array
    const flattenedDataArray = this.flattenArrayFields(dataset);
    // Convert the data array to CSV
    const csv = json2csv(flattenedDataArray);
    // Save CSV to file
    fs.writeFileSync('src/model/tmp/output.csv', csv);

    // Path to the temporary folder
    const tmpFolderPath = path.join(process.cwd(), 'src/model/tmp');
    // Path to the Python script inside the temporary folder
    const pythonScriptPath = path.join(tmpFolderPath, 'train.py');
    // Command to run the Python script
    const command = `python ${pythonScriptPath}`;
    // Function to execute the command
    function execCommand(command) {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing train model: ${error.message}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`Script error output: ${stderr}`);
            reject(new Error(stderr));
            return;
          }
          console.log(`Model output: ${stdout}`);
          resolve(stdout);
        });
      });
    }
    // Execute the command and wait for it to complete
    await execCommand(command);
    const numberOfVersion = await this.prisma.pklModel.count();
    // Read the .pkl file from the server
    const filePath_svm = path.join(tmpFolderPath, 'svm_model.pkl');
    const fileBuffer_svm = fs.readFileSync(filePath_svm);
    const filename_svm =
      path.basename(filePath_svm, '.pkl') + `_v${numberOfVersion + 1}`;

    const filePath_xgb = path.join(tmpFolderPath, 'xgb_model.pkl');
    const fileBuffer_xgb = fs.readFileSync(filePath_xgb);
    const filename_xgb =
      path.basename(filePath_xgb, '.pkl') + `_v${numberOfVersion + 1}`;

    const res = await this.prisma.pklModel.create({
      data: {
        filename_svm,
        file_svm: fileBuffer_svm,
        filename_xgb,
        file_xgb: fileBuffer_xgb,
      },
    });
    return res;
  }

  async getPklModel(id: number): Promise<{ data: any }> {
    const file = await this.prisma.pklModel.findFirst({ where: { id } });
    const file_svm = file.file_svm;
    const file_xgb = file.file_xgb;
    return { data: [file_svm, file_xgb] };
  }

  async getPklLatesModel(): Promise<{ data: any }> {
    const latestModel = await this.prisma.pklModel.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (latestModel) {
      const file_svm = latestModel.file_svm;
      const file_xgb = latestModel.file_xgb;
      return { data: [file_svm, file_xgb] };
    } else {
      throw new NotFoundException(`Model was not found`);
    }
  }

  async countModel(): Promise<{ count: number }> {
    const count = await this.prisma.pklModel.count();
    return { count };
  }
}
