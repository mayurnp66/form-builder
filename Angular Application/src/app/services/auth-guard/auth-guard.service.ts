import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataShareService } from '../utils/data-share.service';

/*Importing service starts*/

/*Importing service ends*/

@Injectable()
export class AuthGuardService implements CanActivate {

	public firstName: string = null;
	public lastName: string = null;
	public email: string = null;

	constructor(
		public router: Router,
		private dataShareService: DataShareService
	) { }
	
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		this.firstName = this.dataShareService.getFirstName();
		this.lastName = this.dataShareService.getLastName();
		this.email = this.dataShareService.getEmail();
		if (this.firstName != null && this.lastName != null && this.email != null) {
			return true;
		} else {
			this.router.navigate(['/authentication']);
			return false;
		}
	}
}
