import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AppsManagerService {
	private appId: string = '';

	init(appId: string): void {
		this.appId = appId;
	}

	checkAppId(checkAppId: string): boolean {
		return this.appId !== undefined && this.appId.length !== 0 && checkAppId === this.appId;
	}

	retrieveAppId(): string {
		return this.appId;
	}
}
