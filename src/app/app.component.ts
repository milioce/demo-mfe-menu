import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appsManager';

  constructor(translate: TranslateService) {
    translate.use('es');
    console.log('Service in AppComponent', translate);
  }

}
