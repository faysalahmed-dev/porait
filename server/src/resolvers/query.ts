import { Context } from './../../prisma';
import { IResolvers } from 'graphql-tools';
import { verifyAuthToken } from '../helpers/auth';

const UserResolver: IResolvers = {
	async user(parent, args, context) {
		const userData = await context.prisma.user.findFirst({
			include: {
				tokens: true
			}
		});
		console.log(userData);

		return userData;
	},
	async authUser(parent, args, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			return user;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async loggedInDevices(parent, args, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			const devices = await context.prisma.token.findMany({
				where: { user_id: user.id },
				select: {
					agent: true,
					details: true,
					ip_address: true
				},
				orderBy: {
					created_at: 'desc'
				}
			});
			return devices.map(item => ({
				...item,
				details: JSON.parse(item.details || '')
			}));
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export default UserResolver;
