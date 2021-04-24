import { PrismaClient } from '@prisma/client';
import { GraphQLRequestContext, GraphQLRequest } from 'apollo-server-types';
const prisma = new PrismaClient({
	errorFormat: 'pretty',
	log: ['error', 'info', 'warn']
});

prisma
	.$connect()
	.then(() => console.log('database connected'))
	.catch(err => console.log(err));

export interface IRequest extends GraphQLRequest {
	protocol: string;
	get(key: string): string;
	headers: {
		'user-agent': string;
		authorization: string;
	};
}
export interface Context extends GraphQLRequestContext {
	prisma: PrismaClient;
	connection?: {
		context: {
			authorization?: string;
		};
	};
	request: IRequest;
}

export function createContext(context: Omit<Context, 'prisma'>): Context {
	return {
		...context,
		prisma
	};
}
