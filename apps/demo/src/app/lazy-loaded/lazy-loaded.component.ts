import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locl-lazy-loaded',
  template: `
    <p i18n="test">Lazy loading works</p>
  `,
  styles: []
})
export class LazyLoadedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
