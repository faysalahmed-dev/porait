import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
	errorFormat: 'pretty',
	log: ['error', 'info', 'warn']
});

prisma
	.$connect()
	.then(() => console.log('database connected'))
	.catch(err => console.log(err));

export interface Context {
	prisma: PrismaClient;
	request: any;
	connection?: any;
}

export function createContext(req: any) {
	return {
		...req,
		prisma
	};
}
