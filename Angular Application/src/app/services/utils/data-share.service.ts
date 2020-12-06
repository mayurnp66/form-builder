import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
	public userId: string = null;
	public userName: string = null;
	private user = new BehaviorSubject(null);

	constructor() { }

	getUserId(): string {
		if (this.userId  === null) {
			this.userId = localStorage.getItem('userid');
		}
		return this.userId;
	}

	getUserName(): string {
		if (this.userName === null) {
			this.userName = localStorage.getItem('username');
		}
		return this.userName;
	}
}
