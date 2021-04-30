import { Context } from '@server/prisma';
import { IResolvers } from 'graphql-tools';

const post: IResolvers = {
	async likes(parent, args, context: Context) {
		const likes = await context.prisma.postReact.findMany({
			where: {
				type: 'LIKE',
				post_id: parent.id
			}
		});
		return { likeCount: likes.length, docRefs: likes };
	},
	async unlike(parent, args, context: Context) {
		const unlike = await context.prisma.postReact.findMany({
			where: {
				type: 'UNLIKE',
				post_id: parent.id
			}
		});
		return { unlikeCount: unlike.length, docRefs: unlike };
	}
};

export default post;
