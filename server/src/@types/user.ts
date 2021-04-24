import { User, Token, Image } from '.prisma/client';

export enum Gender {
	'male',
	'female',
	'other'
}

export type IUser = User;

export interface IUserDataFull extends IUser {
	tokens: Token[] | null;
	images: Image | null;
}
// export interface IUserData {
// 	first_name: string;
// 	last_name: string;
// 	email: string;
// 	username: string;
// 	password: string;
// 	gender: Gender;
// }

export interface IUserUpdate {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	address?: string;
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
