import { Validators } from '@angular/forms';

export class EmailValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
          Validators.required,
          Validators.email
				],
			),
		];
	}
}
