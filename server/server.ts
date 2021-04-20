import { GraphQLServer, Options } from 'graphql-yoga';
import { createContext } from './prisma';
import resolvers from './src/resolvers';
import { GraphQLFileLoader, addResolversToSchema, loadSchemaSync } from 'graphql-tools';
import path from 'path';
import serveStatic from 'serve-static';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';

const filePath = path.join(__dirname, 'graphql-schema', 'schema.graphql');
const schema = loadSchemaSync(filePath, {
	loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
	schema,
	resolvers: { ...resolvers, Upload: GraphQLUpload }
});
const server = new GraphQLServer({
	schema: schemaWithResolvers,
	context: createContext
});

const options: Options = {
	port: process.env.PORT || 8000,
	endpoint: '/graphql',
	subscriptions: '/subscriptions',
	playground: '/___playground',
	uploads: false
};
server.express.use(serveStatic(path.join(__dirname, 'public')));
server.express.use(graphqlUploadExpress());

server.start(options, ({ port }) => {
	console.log('server is running on port ' + port);
});
