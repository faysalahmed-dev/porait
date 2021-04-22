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

export interface IUserUpdate {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	address?: String;
}

export interface IUserUpdatePassword {
	currentPassword: string;
	newPassword: string;
}

export interface IUserTokenDecode {
	id: string;
	exp: string;
	iat: string;
}
