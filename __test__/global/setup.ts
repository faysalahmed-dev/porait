/* eslint-disable */
import { GraphQLServer, Options } from 'graphql-yoga';
import resolvers from '../../server/src/resolvers';
import { GraphQLFileLoader, addResolversToSchema, loadSchemaSync } from 'graphql-tools';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const filePath = path.resolve(__dirname, '../../server/graphql-schema/schema.graphql');
const schema = loadSchemaSync(filePath, {
	loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers
});

const prisma = new PrismaClient();

function createContext(context: any) {
	return {
		...context,
		prisma
	};
}

const server = new GraphQLServer({
	schema: schemaWithResolvers,
	context: createContext
});

const options: Options = {
	port: process.env.PORT || 9000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/___playground',
	uploads: false
};

export default async (): Promise<void> => {
	console.log('global setup');
	await prisma.$connect();
	// @ts-ignore
	global.prisma = prisma;
	console.log('db connected');
	server.start(options, ({ port }) => {
		// @ts-ignore
		global.server = server;
		console.log('test server is running on port ' + port);
	});
};
