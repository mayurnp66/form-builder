import { Validators } from '@angular/forms';

export class LoginPasswordValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.required
				],
			)
		];
	}
}

