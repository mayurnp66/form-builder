import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
	public firstName: string = null;
	public lastName: string = null;
	public email: string = null;

	constructor(
		private router: Router
	) { }

	getFirstName(): string {
		if (this.firstName  === null) {
			this.firstName = localStorage.getItem('firstName');
		}
		return this.firstName;
	}

	getLastName(): string {
		if (this.lastName  === null) {
			this.lastName = localStorage.getItem('lastName');
		}
		return this.lastName;
	}

	getEmail(): string {
		if (this.email  === null) {
			this.email = localStorage.getItem('email');
		}
		return this.email;
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/authentication']);
	}


}
