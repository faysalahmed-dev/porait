/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Context } from '@server/prisma';
import { Comment, CommentResolvers, QueryGetCommentsArgs } from '@src/@types/generates';

const post: CommentResolvers<Context, Comment> = {
	// @ts-ignore
	async likes(parent, args: QueryGetCommentsArgs, context) {
		// console.log(info);
		const likes = await context.prisma.commentLike.findMany({
			where: {
				comment_id: parent.id
			}
		});
		return { likeCount: likes.length, docRefs: likes };
	}
};

export default post;
