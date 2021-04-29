import { Context } from './../../prisma';
import { IResolvers } from 'graphql-tools';
import { verifyAuthToken } from '../helpers/auth';
import _ from 'lodash';
import { getTokenFromHeader } from '../helpers/utils';

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
					token: true,
					agent: true,
					details: true,
					ip_address: true
				},
				orderBy: {
					created_at: 'desc'
				}
			});
			const token = getTokenFromHeader(context);
			const currentDevice = _.find(devices, { token }) as {
				token: string;
				agent: string;
				details: string | null;
				ip_address: string | null;
			};
			if (currentDevice) {
				currentDevice.details = JSON.parse(currentDevice.details || '');
			}
			const loggedInDevices = devices
				.filter(item => item.token !== token)
				.map(item => ({ ...item, details: JSON.parse(item.details || '') }));

			return { current_device: currentDevice, logged_in_devices: loggedInDevices };
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export default UserResolver;
