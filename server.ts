import { GraphQLServer } from 'graphql-yoga';
import { createContext } from './prisma';
import resolvers from './src/resolvers';
import { GraphQLFileLoader, addResolversToSchema, loadSchemaSync } from 'graphql-tools';
import path from 'path';
import serveStatic from 'serve-static';

const filePath = path.join(__dirname, 'src', 'graphql-schema', 'schema.graphql');
const schema = loadSchemaSync(filePath, {
	loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers
});

const server = new GraphQLServer({
	schema: schemaWithResolvers,
	context: createContext
});

const options = {
	port: process.env.PORT || 8000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/___playground'
};
server.express.use(serveStatic(path.join(__dirname, 'public')));

server.start(options, ({ port }) => {
	console.log('server is running on port ' + port);
});
