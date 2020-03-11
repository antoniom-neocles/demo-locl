import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locl-lazy-loaded',
  template: `
    <p i18n="lazy-loaded|Test string used for translating the lazy loaded module@@Lazy loading works">Lazy loading works</p>
    <h1 i18n="lazy-loaded|Label for testing@@label testing">Label for testing the translations</h1>
  `,
  styles: []
})
export class LazyLoadedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
