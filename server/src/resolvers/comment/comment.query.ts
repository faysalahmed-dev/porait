import { IResolvers } from 'graphql-tools';

import { Context } from '@server/prisma';

const CommentResolvers: IResolvers = {
	async getComments(parent, args, context: Context) {
		try {
			const post = await context.prisma.comment.findMany({
				include: { author: true, likes: true, post: { select: { id: true } } }
			});
			return post;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export default CommentResolvers;
