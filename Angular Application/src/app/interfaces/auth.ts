export interface Auth {
	error: boolean;
	message: string;
	data: {
		firstName: string,
		lastName: string,
		email: string
	};
}
