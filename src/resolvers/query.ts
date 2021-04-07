import { IResolvers } from 'graphql-tools';

const UserResolver: IResolvers = {
	async user(parent, args, context) {
		const userData = await context.prisma.user.findFirst({
			include: {
				tokens: true
			}
		});
		return userData;
	}
};

export default UserResolver;
