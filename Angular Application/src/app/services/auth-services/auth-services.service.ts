import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthRegistrationRequest } from 'src/app/interfaces/auth-registration-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthLoginRequest } from 'src/app/interfaces/auth-login-request';
import { Auth } from 'src/app/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private BASE_URL = environment.apiUrl;
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(
		private http: HttpClient,
		public router: Router
  ) { }

  register(params: AuthRegistrationRequest): Observable<Auth> {
		return this.http.post(`${this.BASE_URL}register`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: Auth) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
  }

  login(params: AuthLoginRequest): Observable<Auth> {
		return this.http.post(`${this.BASE_URL}login`, JSON.stringify(params), this.httpOptions).pipe(
			map(
				(response: Auth) => {
					return response;
				},
				(error) => {
					throw error;
				}
			)
		);
  }

  removeLS(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				localStorage.removeItem('employeeId');
				localStorage.removeItem('employeeName');
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}

}
