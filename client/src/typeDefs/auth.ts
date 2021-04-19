import gql from 'graphql-tag';
const fragments = {
	userFragment: gql`
		fragment userFragment on User {
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
export const REGISTER_USER = gql`
	mutation RegisterUser($input: RegisterInput!) {
		register(data: $input) {
			...userFragment
		}
	}
	${fragments.userFragment}
`;
export const LOGIN_USER = gql`
	mutation LoginUser($input: LoginInput!) {
		login(data: $input) {
			...userFragment
		}
	}
	${fragments.userFragment}
`;
export const USER_LOGGED_IN = gql`
	query getUser {
		isLoggedIn @client
	}
`;
export const AUTH_USER = gql`
	query authUser {
		authUser {
			...userFragment
		}
	}
	${fragments.userFragment}
`;
export const LOGOUT_USER = gql`
	mutation logout {
		logoutUser
	}
`;
export const FORGET_PASSWORD = gql`
	mutation forgetUserPassword($input: ForgetPassword!) {
		forgetPassword(data: $input)
	}
`;
export const VERIFY_RESET_PASSWORD = gql`
	mutation resetPassword($input: VerifyPasswordResetTokenInput!) {
		verifyPasswordResetToken(data: $input)
	}
`;
export const RESEND_EMAIL_VERIFY_LINK = gql`
	mutation verifyEmail($userId: String!) {
		resendVerifyEmailToken(user_id: $userId)
	}
`;

export const VERIFY_EMAIL = gql`
	mutation VerifyEmail($input: EmailVerifyInput!) {
		verifyEmail(data: $input)
	}
`;
