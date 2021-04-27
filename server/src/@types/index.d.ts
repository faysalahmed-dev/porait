declare module 'request-ip' {
	import { IRequest } from 'server/prisma';
	let getClientIp: (req: IRequest) => string;

	export { getClientIp };
}
