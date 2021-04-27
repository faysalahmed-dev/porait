import geoIp from 'geoip-lite';
import { IResolvers } from 'graphql-tools';
import { Context } from '../../prisma';
import { FileUpload } from 'graphql-upload';
import path from 'path';
import { v4 as uuid } from 'uuid';
import {
	comparePassword,
	getToken,
	hashPassword,
	verifyAuthToken
} from '../helpers/auth';
import { resizeImage } from '../helpers/image';
import { getHostUrl, getUserAgent } from '../helpers/utils';
import sharp, { ResizeOptions } from 'sharp';
import { IUserTokenDecode, IUserUpdate, IUserUpdatePassword } from '../@types/user';
import { registerSchema, updatePasswordSchema } from '../utils/validatorSchema';
import { decode } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getClientIp } from 'request-ip';

const userResolvers: IResolvers = {
	async uploadImage(_, args, ctx: Context) {
		try {
			const user = await verifyAuthToken(ctx);

			const file: FileUpload = await args.file;
			const filename = `${Date.now()}-${uuid()}.png`;
			const uploadFolder = path.resolve('server/public/upload', filename);
			const stream = file.createReadStream();
			return new Promise((resolve, reject) => {
				const fileChank: Buffer[] = [];
				stream.on('data', chank => fileChank.push(chank as Buffer));
				stream.on('error', reject);
				stream.on('end', async () => {
					const fileUrl = `${getHostUrl(ctx.request)}/upload/${filename}`;
					try {
						const opt = {} as ResizeOptions;
						if (args.type === 'cover') {
							opt.height = 500;
							opt.fit = sharp.fit.cover;
						}
						await resizeImage(fileChank, uploadFolder, opt);
						await ctx.prisma.user.update({
							where: { id: user.id },
							data: {
								images: {
									update: {
										[args.type]: fileUrl,
										uploaded: {
											push: fileUrl
										}
									}
								}
							}
						});
						resolve(fileUrl);
					} catch (err) {
						reject(err);
					}
				});
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async updateUser(_, args: { data: IUserUpdate }, ctx: Context) {
		try {
			// check user is auth
			const user = await verifyAuthToken(ctx);
			// user updateable data key
			const defaultKey = [
				'first_name',
				'last_name',
				'email',
				'username',
				'address',
				'gender'
			];

			const argsKey: string[] = Object.keys(args.data);
			// check user input is empty or not in the default key
			if (!argsKey.length) {
				throw new Error('input must not be empty');
			}

			//  check any field pass that is not accepted
			if (argsKey.find(key => !defaultKey.includes(key))) {
				throw new Error('invalid input value');
			}

			// get validation schema key
			const schemaKey = defaultKey.filter(item => argsKey.includes(item));

			const updateUserSchema = registerSchema.pick(schemaKey);
			await updateUserSchema.validate(args.data);

			const updatedUser = await ctx.prisma.user.update({
				where: { id: user.id },
				data: args.data
			});
			return updatedUser;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async updatePassword(_, args: { data: IUserUpdatePassword }, ctx: Context) {
		try {
			// check user is auth
			const user = await verifyAuthToken(ctx);
			// validate user input
			await updatePasswordSchema.validate(args.data);

			// check old password match
			const passwordMatch = await comparePassword(
				args.data.currentPassword,
				user.password.trim()
			);
			if (passwordMatch) {
				const hashedPassword = await hashPassword(args.data.newPassword);
				const ip_address = getClientIp(ctx.request);
				let details = {};
				if (ip_address) {
					details = geoIp.lookup(ip_address) || {};
				}
				const token = await getToken(user.id);
				const expires_at = decode(token) as IUserTokenDecode;

				await ctx.prisma.user.update({
					where: { id: user.id },
					data: {
						password: hashedPassword,
						password_changed_at: new Date().toISOString(),
						tokens: {
							deleteMany: {
								user_id: user.id
							},
							create: {
								token,
								agent: getUserAgent(ctx.request.headers['user-agent']),
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
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export { userResolvers };
