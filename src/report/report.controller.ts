import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateImageDto } from './dto/create-report.dto';
import { ReportService } from './report.service';
import { EmailService } from 'src/email/email.service';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  findAll() {
    return this.reportService.getAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          // Directory where files will be stored
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            // Generate unique filename
          },
        }),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload two image files for report',
    type: CreateImageDto,
  })
  async uploadFiles(
    @UploadedFiles()
    files: {
      file1?: Express.Multer.File[];
      file2?: Express.Multer.File[];
    },
  ) {
    console.log(files);

    if (files.file1 && files.file1[0]) {
      await this.reportService.saveImageData(
        files.file1[0].originalname,
        files.file1[0].path.replace(/\\/g, '/'),
      );
    }
    if (files.file2 && files.file2[0]) {
      await this.reportService.saveImageData(
        files.file2[0].originalname,
        files.file2[0].path.replace(/\\/g, '/'),
      );
    }
    await this.emailService.sendEmail('New Report Uploaded!');
    return { message: 'Files uploaded successfully', files };
  }
}
