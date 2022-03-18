import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppsManagerService } from './apps-manager.service';

@Component({
	selector: 'apps-manager',
	templateUrl: './apps-manager.component.html',
	styleUrls: ['./apps-manager.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class AppsManagerComponent implements OnInit, OnDestroy {
	@Input() appId!: string;

	constructor(private appsManagerService: AppsManagerService, private translate: TranslateService) {
    console.log('Service in AppsManagerComponent', translate);
  }

	ngOnInit(): void {
		this.appsManagerService.init(this.appId);
		console.log('Starting remote angular mfe on tab with id: ' + this.appsManagerService.retrieveAppId());
	}

	ngOnDestroy(): void {
		console.log('Destroying from inside external app: ' + this.appsManagerService.retrieveAppId());
	}
}
