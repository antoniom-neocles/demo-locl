import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locl-lazy-loaded',
  template: `
    <p i18n="lazy-loaded|Test string used for translating the lazy loaded module@@Lazy loading works">Lazy loading works</p>
  `,
  styles: []
})
export class LazyLoadedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
