import { UpdatesConfig } from '@urql/exchange-graphcache';
import { AUTH_USER } from '../typeDefs/auth';

const updateNode: UpdatesConfig = {
	Mutation: {
		login(result, __, cache) {
			cache.updateQuery({ query: AUTH_USER }, () => ({ authUser: result.login }));
		},
		register(result, __, cache) {
			cache.updateQuery({ query: AUTH_USER }, () => ({
				authUser: result.register
			}));
		},
		uploadImage(result, args, cache) {
			// @ts-ignore
			cache.updateQuery({ query: AUTH_USER }, data => {
				if (!data) return data;
				return {
					authUser: {
						// @ts-ignore
						...data.authUser,
						images: {
							...data.authUser.images,
							[args.type]: result.uploadImage
						}
					}
				};
			});
		},
		updateUser(result, args, cache) {
			// @ts-ignore
			cache.updateQuery({ query: AUTH_USER }, data => ({
				authUser: {
					// @ts-ignore
					...data.authUser,
					...result.updateUser
				}
			}));
		}
	},
	Subscription: {}
};
export default updateNode;
