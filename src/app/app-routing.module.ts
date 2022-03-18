import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppsManagerComponent } from './apps-manager/apps-manager.component';

const config = {
  language: 'es',
  appId: '0001'
}

const routes: Routes = [
  {
    path: 'apps',
    loadChildren: () => import('./apps-manager/apps-manager.module').then(mod => mod.AppsManagerModule.forRoot(config).ngModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
