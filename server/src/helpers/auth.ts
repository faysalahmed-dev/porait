/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Context } from '../../prisma';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bycript from 'bcryptjs';
import { promisify } from 'util';
import { IUserTokenDecode, IUserDataFull } from '../@types/user';

export const getTime = (): number =>
	Date.now() + moment.duration(90, 'days').asMilliseconds();

export const getToken = (userId: string): Promise<string> => {
	return promisify<{ id: string }, jwt.Secret, jwt.SignOptions, string>(jwt.sign)(
		{ id: userId },
		process.env.JWT!,
		{
			expiresIn: getTime()
		}
	);
};
export const verifyToken = (token: string): Promise<IUserTokenDecode> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return promisify<string, jwt.Secret, jwt.VerifyOptions, IUserTokenDecode>(jwt.verify)(
		token,
		process.env.JWT!
	);
};

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await promisify<number, string>(bycript.genSalt)(10);
	const hash = await promisify<string, string, string>(bycript.hash)(password, salt);
	return hash;
};

export const comparePassword = (
	password: string,
	hashPassword: string
): Promise<boolean> => {
	return bycript.compare(password, hashPassword);
};

export async function verifyAuthToken(context: Context): Promise<IUserDataFull> {
	// context is for socket or real time data
	// headers is defalut headers
	const authHeader = context.connection
		? context.connection.context.authorization
		: context.request.headers.authorization;

	if (!!authHeader && !!authHeader.startsWith('Bearer ')) {
		const token = authHeader.replace('Bearer ', '');
		const decoded = await verifyToken(token);
		if (decoded.id) {
			const user = await context.prisma.user.findFirst({
				where: { id: decoded.id },
				include: {
					tokens: true,
					images: true
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
