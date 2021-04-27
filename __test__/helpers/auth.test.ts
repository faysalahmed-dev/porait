import {
	getToken,
	verifyToken,
	hashPassword,
	comparePassword
} from '../../server/src/helpers/auth';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcryptjs';

beforeAll(() => {
	process.env.JWT = 'dkfjksdjflkjskl';
});

describe('auth', () => {
	it('will generate new token', async () => {
		const id = v4();
		expect.assertions(1);
		const token = await getToken(id);
		expect(jwt.decode(token)).toEqual(
			expect.objectContaining({
				id: id
			})
		);
	});
	it('will verify user token', async () => {
		const id = v4();
		const token = jwt.sign({ id }, process.env.JWT);
		expect.assertions(1);
		const decoded = await verifyToken(token);
		expect(decoded).toEqual(
			expect.objectContaining({
				id: id
			})
		);
	});

	it('will not verify token if token was not created with app screate key', async () => {
		const token = jwt.sign({ id: v4() }, 'deeiryeuysjshdjf');
		expect.assertions(1);
		await expect(verifyToken(token)).rejects.toEqual(
			expect.objectContaining({
				name: 'JsonWebTokenError'
			})
		);
	});

	it('will hash the password', async () => {
		expect.assertions(1);
		const pass = await hashPassword('password1234');
		const isMatch = compareSync('password1234', pass);
		expect(isMatch).toEqual(true);
	});

	it('will compere password and retrun "true" ', async () => {
		expect.assertions(1);
		const hash = hashSync('password1234', 10);
		await expect(comparePassword('password1234', hash)).resolves.toBe(true);
	});

	it('will return "false" if password is wrong', async () => {
		expect.assertions(1);
		const hash = hashSync('password1234', 10);
		await expect(comparePassword('password', hash)).resolves.toBe(false);
	});
});
