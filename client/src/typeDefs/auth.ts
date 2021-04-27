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
			images {
				id
				cover
				avater
			}
			token
			gender
			address
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
export const UPLOAD_IMAGE = gql`
	mutation UploadAvater($type: FileType!, $file: Upload!) {
		uploadImage(type: $type, file: $file)
	}
`;

export const UPDATE_USER_DATA = gql`
	mutation updateUserData($data: UserUpdate!) {
		updateUser(data: $data) {
			first_name
			last_name
			username
			email
			gender
			address
		}
	}
`;

export const UPDATE_PASSWORD = gql`
	mutation updateUserPassword($data: UpdatePassword!) {
		updatePassword(data: $data) {
			token
		}
	}
`;
