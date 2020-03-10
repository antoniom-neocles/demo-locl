import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { RouterModule, Routes } from '@angular/router';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';

const currentLanguage = localStorage.getItem('language');

///assets/i18n/lazy-loaded-lazy-loaded-module.${currentLanguage}.json
const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: () =>
      getTranslations(`http://localhost:3333/api/${currentLanguage}/files/lazy-loaded-lazy-loaded-module/download`).then(
        (data: ParsedTranslationBundle) => {
          loadTranslations(data.translations);
          return import('./lazy-loaded/lazy-loaded.module').then(
            mod => mod.LazyLoadedModule
          );
        }
      )
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
