import { gql } from 'graphql-request';

export const registerUser = gql`
	mutation registerUser($data: RegisterInput!) {
		register(data: $data) {
			id
			first_name
			last_name
			username
			email
			email_verified
			images {
				avater
				uploaded
				cover
			}
			token
			gender
		}
	}
`;
