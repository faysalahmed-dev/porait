import { PrismaClient } from '@prisma/client';
import { GraphQLServer } from 'graphql-yoga';

const prisma = new PrismaClient({
	errorFormat: 'pretty',
	log: ['error', 'info', 'query', 'warn']
});
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
	Query: {
		hello: (__: any, { name }: { name: String }) => `Hello ${name || 'World'}`
	}
};

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
	port: 8000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/___playground'
};
server.start(options, ({ port }) => {
	console.log('server is running on port ' + port);
});
