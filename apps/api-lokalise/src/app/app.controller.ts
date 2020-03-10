import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':lang/files/:filename/download')
  async downloadFile(@Param() params) {
    return this.appService.downloadFiles(params.lang, params.filename);
  }

  @Get('translations')
  async getTranslations() {
    return this.appService.getTranslations('fr');
  }
}
