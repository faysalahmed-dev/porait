import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
	errorFormat: 'pretty',
	log: ['error', 'info', 'query', 'warn']
});

prisma
	.$connect()
	.then(() => console.log('database connected'))
	.catch(err => console.log(err));

// declare global {
// 	namespace NodeJS {
// 		interface Global {
// 			prisma: typeof prisma;
// 		}
// 	}
// }
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
