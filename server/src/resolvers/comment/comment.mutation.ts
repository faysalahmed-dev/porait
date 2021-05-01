/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs';
import path from 'path';
import { FileUpload } from 'graphql-upload';

import { Context } from '@server/prisma';
import {
	MutationCreateCommentArgs,
	MutationResolvers,
	Post,
	MutationDeleteCommentArgs,
	MutationUpdateCommentArgs,
	MutationReactCommentArgs
} from '@src/@types/generates';
import { verifyAuthToken } from '@src/helpers/auth';
import { getHostUrl } from '@src/helpers/utils';
import _ from 'lodash';

interface CreateComment extends MutationCreateCommentArgs {
	file: Promise<FileUpload>;
}
interface UpdateComment extends MutationUpdateCommentArgs {
	file: Promise<FileUpload>;
}

function error(message: string) {
	return (err: Error) => {
		err.message = message;
		return err;
	};
}

export const commentResolvers: MutationResolvers<Context, Post> = {
	// @ts-ignore
	async createComment(parent, args: CreateComment, context) {
		try {
			const user = await verifyAuthToken(context);
			const file: FileUpload = await args.file;
			let fileUrl = '';
			if (file) {
				const stream = file.createReadStream();
				const uploadFolder = path.resolve(
					'server/public/upload/comments',
					file.filename
				);
				stream.pipe(fs.createWriteStream(uploadFolder));
				fileUrl = `${getHostUrl(context.request)}/upload/comments/${
					file.filename
				}`;
			}
			// check post is exits
			const post = await context.prisma.post.findFirst({
				where: { id: args.post_id },
				rejectOnNotFound: error('post not found')
			});
			return context.prisma.comment.create({
				data: {
					text: args.data.text,
					image: fileUrl || null,
					post: {
						connect: { id: post.id }
					},
					author: {
						connect: {
							id: user.id
						}
					}
				},
				include: {
					post: {
						select: {
							id: true
						}
					},
					author: true
				}
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async deleteComment(parent, args: MutationDeleteCommentArgs, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			const comment = await context.prisma.comment.findFirst({
				where: { id: args.comment_id, author_id: user.id, post_id: args.post_id },
				rejectOnNotFound: error('comment not found')
			});
			await context.prisma.comment.delete({
				where: { id: comment.id }
			});
			return 'comment deleted';
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	// @ts-ignore
	async updateComment(parent, args: UpdateComment, context) {
		try {
			const user = await verifyAuthToken(context);
			const comment = await context.prisma.comment.findFirst({
				where: { id: args.comment_id, post_id: args.post_id, author_id: user.id },
				rejectOnNotFound: error('comment not found')
			});

			const file: FileUpload = await args.file;
			const commentData = _.pick(args.data, ['text']) as {
				file: string;
				text: string;
			};
			if (file) {
				const stream = file.createReadStream();
				const uploadFolder = path.resolve(
					'server/public/upload/comments',
					file.filename
				);
				stream.pipe(fs.createWriteStream(uploadFolder));
				commentData.file = `${getHostUrl(context.request)}/upload/comments/${
					file.filename
				}`;
			}
			return context.prisma.comment.update({
				where: { id: comment.id },
				data: commentData,
				include: { author: true, likes: true, reply: true }
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async reactComment(parent, args: MutationReactCommentArgs, context) {
		const user = await verifyAuthToken(context);
		const react = await context.prisma.commentLike.findFirst({
			where: {
				comment_id: args.comment_id,
				post_id: args.post_id,
				user_id: user.id
			}
		});
		if (react) {
			await context.prisma.commentLike.delete({
				where: { id: react.id }
			});
			return 'comment unliked';
		} else {
			await context.prisma.commentLike.create({
				data: {
					post_id: args.post_id,
					user_id: user.id,
					comment_id: args.comment_id
				}
			});
			return 'comment liked';
		}
	}
};
