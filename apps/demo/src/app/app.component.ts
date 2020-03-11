import { Component } from '@angular/core';

const name = '$localize';
const lib = 'Locl';

@Component({
  selector: 'locl-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = $localize`:app|Title text for the application@@welcome-msg:It works! Welcome to the demo of ${name} and ${lib} made for ${name}!`;
  public total = 0;

  public setLanguage (language: string) {
    localStorage.setItem('language', language);
    location.reload();
  }
}
