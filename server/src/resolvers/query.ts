import { IResolvers } from 'graphql-tools';
import { verifyAuthToken } from '../helpers/auth';

const UserResolver: IResolvers = {
	async user(parent, args, context) {
		const userData = await context.prisma.user.findFirst({
			include: {
				tokens: true
			}
		});
		return userData;
	},
	async authUser(parent, args, context) {
		try {
			console.log(context.request.headers);
			const user = await verifyAuthToken(context);
			return user;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export default UserResolver;
