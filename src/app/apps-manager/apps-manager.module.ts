import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { AppsManagerComponent } from './apps-manager.component';

import { AppsManagerService } from './apps-manager.service';

const routes: Routes = [{ path: '', component: AppsManagerComponent }];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/apps/', '.json');
}

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [AppsManagerComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
    }),
    MatSidenavModule,
    MatTabsModule
	],
	exports: [RouterModule, AppsManagerComponent],
	providers: []
})
export class AppsManagerModule {
	constructor(private translate: TranslateService) {
    const currentLang = this.translate.currentLang;
    this.translate.currentLang = '';
    this.translate.use(currentLang);
	}

}
