import { Context } from './../../prisma';
import { IResolvers } from 'graphql-tools';
import {
	getToken,
	hashPassword,
	comparePassword,
	verifyAuthToken
} from '../helpers/auth';
// @ts-ignore
import { getClientIp } from 'request-ip';
import geoIp from 'geoip-lite';
import moment from 'moment';
import { decode } from 'jsonwebtoken';
import isIp from 'validator/lib/isIP';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import eamilSender, { genEmailToken } from '../helpers/email';
import _ from 'lodash';
import { getUserAgent } from '../helpers/utils';
import url from 'url';

enum Gender {
	'male',
	'female',
	'other'
}
interface IUserData {
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
	gender: Gender;
}

type MyEnum = 'email' | 'username';

type ILoginInputKey = {
	[key in MyEnum]: string;
};
interface ILoginInput extends ILoginInputKey {
	password: string;
}

interface PasswordResetVerifyInput {
	user_id: string;
	token: string;
	password: string;
}
interface EmailVerify {
	user_id: string;
	token: string;
}

interface PasswordResetObj {
	token: string;
	created_at: Date;
	expires_in: Date;
}

const UserResolver: IResolvers = {
	async register(parent, args: { data: IUserData }, context: Context) {
		try {
			// will remove this line
			await context.prisma.user.deleteMany({});
			const {
				email,
				password,
				username,
				first_name,
				last_name,
				gender
			} = args.data;

			// check user already exits
			const userExits = await context.prisma.user.findFirst({
				where: {
					OR: [{ email }, { username }]
				}
			});
			if (userExits)
				throw new Error(
					`user already exits with this ${
						userExits.email === email ? 'email' : 'username'
					}`
				);
			// hash the user password
			const hashedPassword = await hashPassword(password);
			// get app url(server)
			const hostUrl = url.format({
				protocol: context.request.protocol,
				host: context.request.get('host')
			});
			// genrate email verify token
			const emailVerifyToken = genEmailToken();

			// create user
			const user = await context.prisma.user.create({
				data: {
					email: email.toLowerCase(),
					password: hashedPassword,
					username,
					first_name,
					last_name,
					// @ts-ignore
					gender,
					email_verify_token: emailVerifyToken,
					images: JSON.stringify({
						avater: `${hostUrl}/images/${gender}-avater.png`,
						cover: `${hostUrl}/images/default-cover.png`,
						uploaded: [`${hostUrl}/images/${gender}-avater.png`]
					})
				}
			});
			// genrate auth token
			const token = await getToken(user.id);
			// get user ip address
			const ip_address = getClientIp(context.request);
			// get user location details from ip addess -> city, timezone, area
			let details = {};
			if (isIp(ip_address)) {
				details = geoIp.lookup(ip_address) || {};
			}
			const expires_at = decode(token) as { id: string; exp: string; iat: string };
			// save genarated token
			await context.prisma.user.update({
				where: { id: user.id },
				data: {
					tokens: {
						create: {
							token,
							agent: getUserAgent(context.request.headers['user-agent']),
							expires_at: new Date(expires_at.exp).toISOString(),
							ip_address,
							details: JSON.stringify(details)
						}
					}
				}
			});
			// send verifaction email
			const resetUrl = `${hostUrl}/verify-email?email_token=${emailVerifyToken}&user_id=${user.id}`;
			if (process.env.NODE_ENV === 'production') {
				await eamilSender.sendMail({
					from: 'support@porait.com',
					to: user.email,
					subject: 'Confirm Email Address',
					template: {
						name: 'confirm-email.pug',
						data: { resetUrl }
					}
				});
			}
			return { ...user, token };
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async login(parent, args: { data: ILoginInput }, context: Context) {
		try {
			const dataObj = { password: args.data.password } as ILoginInput;

			if (isEmail(args.data.email || '') && isEmpty(args.data.username || '')) {
				dataObj.email = args.data.email.toLowerCase();
			} else {
				dataObj.username = args.data.username;
			}
			const queryFor = 'email' in dataObj ? 'email' : 'username';
			const user = await context.prisma.user.findUnique({
				where: {
					[queryFor]: dataObj[queryFor]
				}
			});
			if (!user) {
				throw new Error('user not found');
			} else {
				const passwordMatch = await comparePassword(
					dataObj.password,
					user.password.trim()
				);
				if (passwordMatch) {
					const token = await getToken(user.id);
					const ip_address = getClientIp(context.request);
					let details = {};
					if (isIp(ip_address)) {
						details = geoIp.lookup(ip_address) || {};
					}
					const expires_at = decode(token) as {
						id: string;
						exp: string;
						iat: string;
					};
					await context.prisma.user.update({
						where: { id: user.id },
						data: {
							tokens: {
								create: {
									token,
									agent: getUserAgent(
										context.request.headers['user-agent']
									),
									expires_at: new Date(expires_at.exp).toISOString(),
									ip_address,
									details: JSON.stringify(details)
								}
							}
						}
					});
					return { ...user, token };
				} else {
					throw new Error("password don't match");
				}
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async forgetPassword(parent, args: { data: { email: string } }, context: Context) {
		try {
			const hasUser = await context.prisma.user.findUnique({
				where: { email: args.data.email }
			});
			if (hasUser) {
				const hashToken = genEmailToken();
				const resetUrl = `${context.request.headers.host}/password-reset?token=${hashToken}&user_id=${hasUser.id}`;
				await context.prisma.user.update({
					where: { email: args.data.email },
					data: {
						password_reset_token: JSON.stringify({
							token: hashToken,
							created_at: Date.now(),
							expires_in:
								Date.now() +
								moment.duration(15, 'minutes').asMilliseconds()
						})
					}
				});
				await eamilSender.sendMail({
					from: 'support@porait.com',
					to: args.data.email,
					subject: 'Reset Password',
					template: {
						name: 'password-reset.pug',
						data: { resetUrl }
					}
				});
				return 'password reset link send to your email address. please check your inbox or spam folder';
			} else {
				throw new Error('user not found');
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async verifyPasswordResetToken(
		pr,
		args: { data: PasswordResetVerifyInput },
		{ prisma }: Context
	) {
		try {
			const user = await prisma.user.findFirst({
				where: { id: args.data.user_id }
			});
			if (user && typeof user.password_reset_token === 'string') {
				const resetTokenObj = JSON.parse(
					user.password_reset_token
				) as PasswordResetObj;
				if (_.isEqual(resetTokenObj.token, args.data.token)) {
					if (moment(Date.now()).isAfter(resetTokenObj.expires_in)) {
						// token expire
						throw new Error('token expires');
					} else {
						const hashedPassword = await hashPassword(args.data.password);
						await prisma.user.update({
							where: {
								id: user.id
							},
							data: {
								password: hashedPassword,
								password_reset_token: null,
								password_changed_at: new Date().toISOString()
							}
						});
						return 'password updated';
					}
				} else {
					throw new Error('invalid token');
				}
			} else {
				throw new Error('user not found');
			}
		} catch (err) {
			throw err;
			// throw new Error('some thing went wrong');
		}
	},
	async verifyEmail(parent, args: { data: EmailVerify }, { prisma }: Context) {
		try {
			const user = await prisma.user.findFirst({
				where: { id: args.data.user_id }
			});
			if (!user) {
				throw new Error('user not found');
			}
			if (user.email_verified) {
				throw new Error('email address already verified');
			}
			if (!user.email_verify_token) {
				throw new Error('token not found');
			}
			if (_.isEqual(user.email_verify_token, args.data.token)) {
				await prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						email_verified: true,
						email_verify_token: ''
					}
				});
				return 'email verified';
			} else {
				throw new Error('invalid token');
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async resendVerifyEmailToken(parent, args: { data: EmailVerify }, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			const resetUrl = `${context.request.headers.host}/verify-email?email_token=${user.email_verify_token}&user_id=${user.id}`;

			await eamilSender.sendMail({
				from: 'support@porait.com',
				to: user.email,
				subject: 'Confirm Email Address',
				template: {
					name: 'confirm-email.pug',
					data: { resetUrl }
				}
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};
export default UserResolver;
