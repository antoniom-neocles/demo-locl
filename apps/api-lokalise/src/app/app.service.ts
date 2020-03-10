import { Injectable } from '@nestjs/common';
import { LokaliseAPI } from 'node-lokalise-api';
import * as JSZip from 'jszip';
import * as request from 'request-promise-native';

@Injectable()
export class AppService {

  private apiKey = '460899465e65fb3562ea14.10852720';
  private projectID = 'ac4dcd625dd3baf902632f9b2192e0227f1041b2';
  private api: LokaliseAPI;

  constructor () {
    this.api = new LokaliseAPI({
      token: this.projectID
    });
  }

  public async downloadFiles(language: string, filename: string) {
    const apiResponse = await this.api.files.download(
      this.apiKey,
      {
        format: 'json',
        original_filenames: true,
        filter_filenames: [`${filename}.%LANG_ISO%.xlf`],
        filter_langs: [language]
      }
    );
    const zipFile = await request({
      method: 'GET',
      url: apiResponse.bundle_url,
      encoding: null
    });

    const zip = await JSZip.loadAsync(zipFile);

    return zip
      .file(`${language}/${filename}.${language}.json`)
      .async('string')
      .then(data => {
        // remove the following line of code when you'll figure out 
        // the issue which causes the wrong interpretation of the generic 
        // translations tokens from xlf1.2 to json performed by lokalise api.
        const newData = data.replace(/<x id=\\"([a-zA-Z0-9_-]*)\\"\\\/>/g, `{$)$1}`).replace(/\$\)/g, '$');

        return {locale: language, translations: JSON.parse(newData)};
      });
  }

  //the library that I'm using for this POC is not updated with the current version of lokalise APIv2 (which implements a filter called 'filter_lang_id'),
  // so it doesn't support filtering for language or file name.
  public async getTranslations(language: string) {
    return await this.api.translations
      .list(this.projectID)
      .then(data =>
        data.translations.filter(entry => entry.language_iso === language)
      );
  }
}
