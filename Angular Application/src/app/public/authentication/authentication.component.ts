import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

/* Importing services starts*/
import { FormService } from '../../services/form/form.service';
/* Importing services ends*/

/* importing interfaces starts */
import { AuthServicesService } from 'src/app/services/auth-services/auth-services.service';
/* importing interfaces starts */

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

	public setTabPosition = 'center';
	public overlayDisplay = false;
	public isuserNameAvailable = false;
	public loginError = false;
	public registrationError = false;
	public errorMessage;

	private loginForm: FormGroup;
	private registrationForm: FormGroup;
	constructor(
		private router: Router,
		private formService: FormService,
		private authServicesService: AuthServicesService
	) {
		this.loginForm = this.formService.createLoginForm();
		this.registrationForm = this.formService.createRegistrationForm();
	}

	ngOnInit() {
	}

	login(): void {
		if (this.loginForm.valid) {
			this.overlayDisplay = true;
			this.authServicesService.login(this.loginForm.value).subscribe(
				(response) => {
					console.log('response', response);
					this.overlayDisplay = false;
					if (response.error == true) {
						this.loginError = true;
						this.errorMessage = response.message;
					} else {
						localStorage.setItem('firstName', response.data.firstName);
						localStorage.setItem('lastName', response.data.lastName);
						localStorage.setItem('email', response.data.email);
						this.router.navigate(['/survey']);
					}
				},
				(error) => {
					this.overlayDisplay = true;
					alert('Something bad happened; please try again later.');
				}
			);
		}
	}

	register(): void {
		if (this.registrationForm.valid) {
			this.overlayDisplay = true;
			this.authServicesService.register(this.registrationForm.value).subscribe(
				(response) => {
					console.log('response', response);
					this.overlayDisplay = false;
					if (response.error == true) {
						this.registrationError = true;
						this.errorMessage = response.message;
					} else {
						localStorage.setItem('firstName', this.registrationForm.get('firstName').value);
						localStorage.setItem('lastName', this.registrationForm.get('lastName').value);
						localStorage.setItem('email', this.registrationForm.get('email').value);
						this.router.navigate(['/survey']);
					}
				},
				(error) => {
					this.overlayDisplay = true;
					alert('Something bad happened; please try again later.');
				}
			);
		}
	}

}
