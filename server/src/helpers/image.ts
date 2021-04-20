import sharp, { ResizeOptions } from 'sharp';

export const resizeImage = (
	fileChank: Buffer[],
	uploadFolder: string,
	opt: ResizeOptions
) => {
	return sharp(Buffer.concat(fileChank))
		.resize({
			fit: sharp.fit.cover,
			...opt
		})
		.withMetadata()
		.toFormat('png')
		.toFile(uploadFolder);
};
