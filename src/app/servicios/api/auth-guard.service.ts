import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {
	constructor(public api: ApiService) {}

	canActivate(): boolean {
		return this.api.isAuthenticated();
	}
}