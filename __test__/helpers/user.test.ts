import { IUserTokenDecode } from './../../server/src/@types/user';
import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';

import { registerUser } from '../graphql/user';

const state = {
	user: {
		first_name: 'jhon',
		last_name: 'doe',
		username: 'jhon146',
		email: 'jhon146@gmail.com',
		password: 'jhon146',
		gender: 'male'
	}
};

const endpoint = `http://localhost:9000/graphql`;

const graphQLClient = new GraphQLClient(endpoint, {
	headers: {}
});

beforeAll(async () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	await global.prisma.user.deleteMany({});
});

describe('User Register', () => {
	it('will register new user', async () => {
		// expect.assertions(9);
		const user = await graphQLClient.request(registerUser, { data: state.user });
		const userData = user.data.register;
		Object.keys(state.user).forEach(userKey => {
			if (userKey !== 'password') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				expect(userData[userKey].trim()).toEqual(state.user[userKey]);
			}
		});
		expect(userData.id).toBeTruthy();
		expect(userData.email_verified).toEqual(false);
		expect(userData.images).toEqual(
			expect.objectContaining({
				avater: 'http://localhost:9000/images/male-avater.png',
				cover: 'http://localhost:9000/images/default-cover.png',
				uploaded: ['http://localhost:9000/images/male-avater.png']
			})
		);

		const decoded = jwt.decode(userData.token) as IUserTokenDecode;
		expect(userData.id).toEqual(decoded.id);
	});
});

// describe('User Login', () => {
// 	it();
// });
