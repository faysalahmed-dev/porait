import { defaultExchanges, ClientOptions, createClient } from '@urql/vue';
import resolvers from './resolvers/index';
import updateNodes from './resolvers/updateNodes';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';

const clientOpt: ClientOptions = {
	url: 'http://localhost:8000/graphql',
	exchanges: [
		devtoolsExchange,
		cacheExchange({ resolvers, updates: updateNodes }),
		...defaultExchanges
	],
	fetchOptions: () => {
		const token = localStorage.getItem('token');
		return { headers: { authorization: token ? `Bearer ${token}` : '' } };
	}
};

const client = createClient(clientOpt);

export { client };
