// Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
import '@angular/localize/init';

import { enableProdMode } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const setApplicationLanguage = (language: string) =>
  getTranslations(`/assets/i18n/app-app-module.${language}.json`).then(
    (data: ParsedTranslationBundle) => {
      loadTranslations(data.translations);
      import('./app/app.module').then(module => {
        platformBrowserDynamic()
          .bootstrapModule(module.AppModule)
          .catch(err => console.error(err));
      });
    }
  );


  let currentLanguage = localStorage.getItem('language');
  if(currentLanguage === null) {
    currentLanguage = 'en-US';
  }
  setApplicationLanguage(currentLanguage);
