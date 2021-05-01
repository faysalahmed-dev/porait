import { IResolvers } from 'graphql-tools';

import { Context } from '@server/prisma';

const UserResolver: IResolvers = {
	async getPosts(parent, args, context: Context) {
		try {
			const post = await context.prisma.post.findMany({
				include: { reacts: true, author: true }
			});
			return post;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async getPost(parent, args: { post_id: string }, context: Context) {
		try {
			const post = await context.prisma.post.findFirst({
				where: {
					id: args.post_id
				},
				include: { author: true, comments: true, reacts: true },
				rejectOnNotFound(err) {
					err.message = 'post not found';
					return err;
				}
			});
			return post;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export default UserResolver;
