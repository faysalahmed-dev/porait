import { AUTH_USER } from './../typeDefs/auth';
import { UpdatesConfig } from '@urql/exchange-graphcache';
const updateNode: UpdatesConfig = {
	Mutation: {
		login(result, __, cache) {
			cache.updateQuery({ query: AUTH_USER }, () => {
				return { authUser: result.login };
			});
		},
		register(result, __, cache) {
			cache.updateQuery({ query: AUTH_USER }, () => {
				return { authUser: result.register };
			});
		}
	},
	Subscription: {}
};
export default updateNode;
