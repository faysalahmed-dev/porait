import gql from 'graphql-tag';

const fragments = {
	userResultFrg: gql`
		fragment userResultFragment on UserResult {
			id
			first_name
			last_name
			username
			email
			email_verified
			images
			token
			gender
		}
	`
};

export const regsiterMutation = gql`
	mutation RegisterUser($input: RegisterInput!) {
		register(data: $input) {
			...userResultFragment
		}
	}
	${fragments.userResultFrg}
`;

export const loginMutation = gql`
	mutation LoginUser($input: LoginInput!) {
		login(data: $input) {
			...userResultFragment
		}
	}
	${fragments.userResultFrg}
`;
