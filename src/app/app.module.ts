import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { CoreModule as ARGOCoreModule } from '@argo/core';
import { CommonModule as ARGOCommonModule } from '@argo/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultilanguageModule } from '@argo/multilanguage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/core/', '.json');
}

let modules = [];

if (environment.useArgo) {
  modules = [
    ARGOCommonModule.forRoot('http://localhost:4302/'),
    ARGOCoreModule.forRoot(true),
    MultilanguageModule.forRoot('es', ['es', 'en'], './assets/i18n/core/'),
  ];
} else {
  modules = [
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ];
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    modules,

    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
