import { Context } from './../../prisma';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bycript from 'bcryptjs';
import { promisify } from 'util';
import _ from 'lodash';
import isJWT from 'validator/lib/isJWT';

export const getTime = () => Date.now() + moment.duration(90, 'days').asMilliseconds();

export const getToken = (userId: string) => {
	return promisify<object, jwt.Secret, jwt.SignOptions, string>(jwt.sign)(
		{ id: userId },
		process.env.JWT!,
		{
			expiresIn: getTime()
		}
	);
};
export const verifyToken = (token: string) => {
	// @ts-ignore
	return promisify<string, jwt.Secret, jwt.VerifyOptions, { id: string }>(jwt.verify)(
		token,
		process.env.JWT!
	);
};

export const hashPassword = async (password: string) => {
	const salt = await promisify<number, string>(bycript.genSalt)(10);
	const hash = await promisify<string, string, string>(bycript.hash)(password, salt);
	return hash;
};

export const comparePassword = (password: string, hashPassword: string) => {
	return bycript.compare(password, hashPassword);
};

export async function verifyAuthToken(context: Context) {
	// context is for socket or real time data
	// headers is defalut headers
	const authHeader = context.connection
		? context.connection.context.authorization
		: context.request.headers.authorization;

	//  check token
	// console.log(authHeader);
	const conditions =
		authHeader &&
		authHeader.startsWith('Bearer ') &&
		isJWT(authHeader.replace('Bearer ', ''));
	if (conditions) {
		const token = authHeader.replace('Bearer ', '');
		console.log(token);
		const decoded = await verifyToken(token);
		if (decoded.id) {
			const user = await context.prisma.user.findFirst({
				where: { id: decoded.id },
				include: {
					tokens: true
				}
			});
			if (!user) throw new Error('user not found');
			else {
				const userToken = user.tokens.find(userTk => userTk.token === token);
				if (!userToken) throw new Error('token not found');
				else {
					// check token is expired
					if (moment(Date.now()).isAfter(userToken.expires_at)) {
						// token expire
						throw new Error('token expires');
						// check password is change after token genrated
					} else if (
						moment(user.password_changed_at).isAfter(userToken.created_at)
					) {
						// password is change
						throw new Error('user recently change password.');
					} else {
						return user;
					}
				}
			}
		} else {
			throw new Error('auth token invalid');
		}
	} else {
		throw new Error('unauthorized');
	}
}
