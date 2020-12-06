import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';

import { UsernameValidator } from './../../classes/validators/username-validator';
import { PasswordValidator } from './../../classes/validators/password-validator';
import { MessageValidator } from './../../classes/validators/message-validator';
import { EmailValidator } from './../../classes/validators/email-validators';

@Injectable()
export class FormService {
	constructor() { }

	createLoginForm(): FormGroup {
		return new FormBuilder().group({
			email: new EmailValidator(),
			password: new PasswordValidator(),
		});
	}

	createRegistrationForm(): FormGroup {
		return new FormBuilder().group({
			firstName: new UsernameValidator(),
			lastName: new UsernameValidator(),
			email: new EmailValidator(),
			password: new PasswordValidator(),
		});
	}

	createMessageForm(): FormGroup {
		return new FormBuilder().group({
			message: new MessageValidator
		});
	}
}
