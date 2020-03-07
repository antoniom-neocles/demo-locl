import { Injectable } from '@nestjs/common';
import { LokaliseAPI } from 'node-lokalise-api';

@Injectable()
export class AppService {
  private api = new LokaliseAPI({ token: '<your-lokalise-api-token>' });

  private async listAllFiles () {
    return await this.api.files.list('<project id>', {
      page: 1,
      limit: 100,
      filter_filename: ''
    });
  };
  
  getData(): { message: string } {
    return { message: 'Welcome to api-lokalise!' };
  }
  async getFiles() {
    return await this.listAllFiles();
    //return await Promise.resolve({test: 123});
  }
}
