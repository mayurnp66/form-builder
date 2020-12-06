import { Validators } from '@angular/forms';

export class PasswordValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),
					Validators.minLength(8),
					Validators.required
				],
			)
		];
	}
}

