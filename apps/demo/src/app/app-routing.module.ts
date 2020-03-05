import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { RouterModule, Routes } from '@angular/router';
import { getTranslations, ParsedTranslationBundle } from '@locl/core';

const currentLanguage = localStorage.getItem('language');

const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: () =>
      getTranslations(`/assets/i18n/lazy-loaded-lazy-loaded-module.${currentLanguage}.json`).then(
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
