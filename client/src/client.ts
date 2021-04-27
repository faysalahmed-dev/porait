import { defaultExchanges, ClientOptions, createClient } from '@urql/vue';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import resolvers from './resolvers/index';
import updateNodes from './resolvers/updateNodes';

const clientOpt: ClientOptions = {
	url: 'http://localhost:8000/graphql',
	exchanges: [
		devtoolsExchange,
		cacheExchange({ resolvers, updates: updateNodes }),
		multipartFetchExchange,
		...defaultExchanges
	],
	fetchOptions: () => {
		const token = localStorage.getItem('token');
		return { headers: { authorization: token ? `Bearer ${token}` : '' } };
	}
};

const client = createClient(clientOpt);

export { client };
