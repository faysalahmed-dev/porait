import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { IResolvers } from 'graphql-tools';
import { FileUpload } from 'graphql-upload';

import { Context } from '@server/prisma';

import { verifyAuthToken } from '@src/helpers/auth';
import { getHostUrl } from '@src/helpers/utils';

interface IPostData {
	title: string;
	content: string;
	tags: string[];
	published: boolean;
}
type CreatePost = { file: Promise<FileUpload>; postData: IPostData };
type UpdatePost = { post_id: string; postData: IPostData };

interface PostArg {
	post_id: string;
	type: 'LIKE' | 'UNLIKE' | 'NONE';
}

export const postResolvers: IResolvers = {
	async createNewPost(parent, args: CreatePost, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			const postData = _.pick(args.postData, [
				'content',
				'title',
				'tags',
				'published'
			]);
			const file: FileUpload = await args.file;
			let fileUrl = '';
			if (file) {
				const stream = file.createReadStream();
				const uploadFolder = path.resolve(
					'server/public/upload/posts',
					file.filename
				);
				stream.pipe(fs.createWriteStream(uploadFolder));
				fileUrl = `${getHostUrl(context.request)}/upload/posts/${file.filename}`;
			}
			const posts = await context.prisma.post.create({
				data: {
					...postData,
					author: {
						connect: { id: user.id }
					},
					file_url: fileUrl,
					type: 'IMAGE'
				},
				include: {
					author: true
				}
			});
			return posts;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async updatePost(parent, args: UpdatePost, context: Context) {
		try {
			const user = await verifyAuthToken(context);
			//? find the post by id
			const post = await context.prisma.post.findFirst({
				where: { id: args.post_id }
			});
			//! post not found throw error
			if (!post) throw new Error('post not found');

			//? check post created by current user
			if (post.author_id === user.id) {
				// todo update the post
				const updatedPost = await context.prisma.post.update({
					where: { id: post.id },
					data: _.pick(args.postData, ['title', 'content', 'tags', 'published'])
				});
				return updatedPost;
			} else {
				//! not created by this user. throw error
				throw new Error('permision denide');
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async deletePost(parent, args, context: Context) {
		try {
			const user = await verifyAuthToken(context);

			//? find the post by id
			const post = await context.prisma.post.findFirst({
				where: { id: args.post_id }
			});
			//! post not found throw error
			if (!post) throw new Error('post not found');

			//? check post created by current user
			if (post.author_id === user.id) {
				// * post deleted
				await context.prisma.post.delete({ where: { id: post.id } });
				return 'post deleted';
			} else {
				//! not created by this user. throw error
				throw new Error('permision denide');
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	async postReact(parent, args: PostArg, context: Context) {
		try {
			// check user is auth
			const user = await verifyAuthToken(context);
			// find the and check post is exits
			const post = await context.prisma.post.findFirst({
				where: { id: args.post_id },
				include: { reacts: true }
			});
			// if post not found throw error
			if (!post) throw new Error('post not found');

			// check user is reacted befor
			const hasReacted = await context.prisma.postReact.findFirst({
				where: { user_id: user.id, post_id: post.id }
			});

			if (hasReacted) {
				/*
					if user already react the post

					* check reacted type ** PostArg.type ** with args.type
					ex: if user already liked post and try like again in this case throw error

				*/
				if (hasReacted.type === args.type) {
					// user react befor and try react again with same type => PostArg.type
					throw new Error(`already ${hasReacted.type.toLowerCase()}`);
				} else if (args.type === 'NONE') {
					/**
					 * user already liked or unlike the post now went to withdrw like or unlike
					 */
					await context.prisma.postReact.delete({
						where: { id: hasReacted.id }
					});
					return 'remove post react';
				} else {
					/*
					 * example: user like the post before now went unlike post
					 */
					await context.prisma.postReact.update({
						where: { id: hasReacted.id },
						data: { type: args.type }
					});
					return 'post ' + args.type.toLowerCase() + 'd';
				}
			} else {
				/**
				 * args.type reach here that mean user doesn't react before
				 * thow error
				 */
				if (args.type === 'NONE') throw new Error('invalid opration');

				/*
				 *  good to go
				 */
				await context.prisma.postReact.create({
					data: { user_id: user.id, post_id: args.post_id, type: args.type }
				});
				return 'post ' + args.type.toLowerCase() + 'd';
			}
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};
