import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  description: string;
  flagLink: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agube-fe';

  public languages: Language[] = [
    {
      code: 'es',
      description: 'Español',
      flagLink: 'http://country.io/static/flags/48/es.png',
    },
    {
      code: 'en',
      description: 'English',
      flagLink: 'http://country.io/static/flags/48/gb.png',
    },
  ];

  public selectedLanguage = new FormControl('');

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  public selectLenguaje(language: Language) {
    this.translate.use(language.code);
  }
}
