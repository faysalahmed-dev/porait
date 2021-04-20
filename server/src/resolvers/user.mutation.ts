import { IResolvers } from 'graphql-tools';
import { Context } from '../../prisma';
import { FileUpload } from 'graphql-upload';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { verifyAuthToken } from '../helpers/auth';
import { resizeImage } from '../helpers/image';
import { getHostUrl } from '../helpers/utils';
import { ResizeOptions } from 'sharp';

const userResolvers: IResolvers = {
	async uploadImage(_, args, cxt: Context, info) {
		try {
			const user = await verifyAuthToken(cxt);

			const file: FileUpload = await args.file;
			const filename = `${Date.now()}-${uuid()}.png`;
			const uploadFolder = path.resolve('server/public/upload', filename);
			const stream = file.createReadStream();
			return new Promise((resolve, reject) => {
				const fileChank: Buffer[] = [];
				stream.on('data', chank => fileChank.push(chank as Buffer));
				stream.on('error', reject);
				stream.on('end', async () => {
					const fileUrl = `${getHostUrl(cxt.request)}/upload/${filename}`;
					try {
						const opt = {} as ResizeOptions;
						if (args.type === 'avater') {
							opt.width = 400;
						}
						await resizeImage(fileChank, uploadFolder, opt);
						await cxt.prisma.user.update({
							where: { id: user.id },
							data: {
								images: {
									update: {
										[args.type]: fileUrl,
										uploaded: {
											push: fileUrl
										}
									}
								}
							}
						});
						resolve(fileUrl);
					} catch (err) {
						reject(err);
					}
				});
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
};

export { userResolvers };
