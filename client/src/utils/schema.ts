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

const confirmPasswordSchema = yup
	.string()
	.oneOf([yup.ref('password'), null], 'Passwords must match')
	.required('confirm password required')
	.min(6, 'confirm password is too short minmun 6 characters long')
	.max(29, 'confirm password is too long maximun 29 characters long');

const usernameSchema = yup
	.string()
	.required('username required')
	.min(4, 'user name to short')
	.max(19, 'user name to long');

const firstNameSchema = yup.string().required('first name required');

const lastNameSchema = yup.string().required('last name required');

const inputCheckedSchema = yup.boolean().isTrue();

const genderSchema = yup
	.string()
	.required()
	.matches(/(male|female|other)/, 'invalid gender type provided');

const addressSchema = yup.string().notRequired();

const loginSchema = yup.object({ email: emailSchema, password: passwordSchema });

const registerSchema = yup.object({
	first_name: firstNameSchema,
	last_name: lastNameSchema,
	username: usernameSchema,
	email: emailSchema,
	password: passwordSchema,
	confirmPassword: confirmPasswordSchema,
	inputChecked: inputCheckedSchema,
	gender: genderSchema
});
const forgetPasswordSchema = yup.object({ email: emailSchema });
const resetPasswordSchema = yup.object({
	password: passwordSchema,
	confirmPassword: confirmPasswordSchema
});
export const updateUserSchema = yup.object({
	first_name: firstNameSchema,
	last_name: lastNameSchema,
	username: usernameSchema,
	email: emailSchema,
	gender: genderSchema,
	address: addressSchema
});

export { loginSchema, registerSchema, forgetPasswordSchema, resetPasswordSchema };
