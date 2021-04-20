export enum Gender {
	'male',
	'female',
	'other'
}

export interface IUserData {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	gender: Gender;
}
