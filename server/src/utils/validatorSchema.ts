import * as yup from 'yup';

const emailSchema = yup
	.string()
	.required('email address required')
	.email('please provide valid email address')
	.lowercase()
	.trim();

const passwordSchema = yup
	.string()
	.required('password required')
	.min(6, 'password is too short minmun 6 characters long')
	.max(29, 'password is too long maximun 29 characters long');

const usernameSchema = yup
	.string()
	.required('username required')
	.min(4, 'user name to short')
	.max(19, 'user name to long');
const firstNameSchema = yup.string().required('first name required');
const lastNameSchema = yup.string().required('last name required');
const genderSchema = yup
	.string()
	.required()
	.matches(/(male|female|other)/, 'invalid gender type provided');

const addressSchema = yup.string().notRequired();

const registerSchema = yup.object().shape({
	first_name: firstNameSchema,
	last_name: lastNameSchema,
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
	gender: genderSchema
});

const loginSchema = yup.object().shape({
	email: emailSchema,
	password: passwordSchema
});

const verifyPasswordResetToken = yup.object().shape({
	user_id: yup.string().required('user id not found').uuid('user id look like invalid'),
	token: yup.string().required('token not found'),
	password: passwordSchema
});

const updatePasswordSchema = yup.object().shape({
	currentPassword: passwordSchema,
	newPassword: passwordSchema
});

export {
	registerSchema,
	loginSchema,
	verifyPasswordResetToken,
	addressSchema,
	updatePasswordSchema
};
