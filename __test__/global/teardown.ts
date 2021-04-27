/* eslint-disable */
export default async (): Promise<void> => {
	console.log('global traddown');
	// await global.server.stop();
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	await global.prisma.$disconnect();
};
