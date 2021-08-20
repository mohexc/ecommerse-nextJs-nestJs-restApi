import { Controller, Post, Res, UploadedFile, UploadedFiles, UseInterceptors, Response, Get, Param } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Logger } from '@nestjs/common';
import { storage } from './storage.config';
import { join } from 'path';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('single-uploadfile')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File,) {
    Logger.log(file)
    return `http://localhost:3001/dowload/${file.filename}`

  }

  @Post('multiple-uploadfile')
  @UseInterceptors(FilesInterceptor('files', 6, { storage }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const images = files.map(file => `http://localhost:3001/dowload/${file.filename}`)
    return images
  }

  @Get('dowload/:imagename')
  seeUploadedFile(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/' + imagename));
  }

}
