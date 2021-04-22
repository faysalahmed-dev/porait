enum Gender {
	male,
	female,
	other
}
export interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	address: string;
	email_verified: boolean;
	images: {
		avater?: string;
		cover?: string;
		uploaded?: [string];
	};
	gender: Gender;
}
