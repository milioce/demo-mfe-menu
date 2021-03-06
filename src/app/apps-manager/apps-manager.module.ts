import { CUSTOM_ELEMENTS_SCHEMA, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

import { CoreModule as ARGOCoreModule } from '@argo/core';
import { CommonModule as ARGOCommonModule, ConfigService } from '@argo/common';
import { MultilanguageLazyModule, MultilanguageModule, MultilanguageService } from '@argo/multilanguage';

import { AppsManagerComponent } from './apps-manager.component';

import { AppsManagerService } from './apps-manager.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';

declare var __webpack_public_path__: string;
environment.domain =  __webpack_public_path__ || '';

export function createChildTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.domain}/assets/i18n/apps/`, '.json');
}

const routes: Routes = [{ path: '', component: AppsManagerComponent }];
let modules = [];

if (environment.useArgo) {
  modules = [
    ARGOCommonModule.forRoot(environment.domain),
    ARGOCoreModule.forRoot(true),
    MultilanguageModule.forRoot('es', ['es', 'en'], `${environment.domain}/assets/i18n/apps/`),
  ];
} else {
  modules = [
    TranslateModule.forChild({
      extend: false,
      isolate: true, // Una instancia propia para el MFE
      loader: {
        provide: TranslateLoader,
        useFactory: (createChildTranslateLoader),
        deps: [HttpClient]
      }
    })
  ];
}

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [AppsManagerComponent],
	imports: [
		RouterModule.forChild(routes),

    modules,
    TranslateModule, // Si no importo esto no reconoce el pipe translate

    MatSidenavModule,
    MatTabsModule
	],
	exports: [
    RouterModule,
    AppsManagerComponent
  ],
	providers: []
})
export class AppsManagerModule {
  static forRoot(config?: any): ModuleWithProviders<AppsManagerModule> {
    return {
      ngModule: AppsManagerModule,
      providers: [
      ]
    }
  }
	constructor(private injector: Injector, private router: Router, private route: ActivatedRoute) {

    this.reloadLanguage();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.route;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    ).subscribe(data => {
      console.log('Router data in MFE', data);
    });
	}

  private reloadLanguage() {
    if (environment.useArgo) {
      const translate = this.injector.get(MultilanguageService);
      if (translate) {
        const currentLang = translate.getCurrentLanguage();
        translate.reloadLang(`${environment.domain}/assets/i18n/apps/`, currentLang);
      }
    } else {
      const translate = this.injector.get(TranslateService);
      const currentLang = translate.currentLang || 'es';
      translate.currentLang = '';
      translate.use(currentLang);
    }
  }
}
