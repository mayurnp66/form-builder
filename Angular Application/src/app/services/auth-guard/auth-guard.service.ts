import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

/*Importing service starts*/

/*Importing service ends*/

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		public router: Router
	) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
		throw new Error('Method not implemented.');
	}
}
