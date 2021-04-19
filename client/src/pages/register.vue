<template>
	<default-layout>
		<div
			class="container max-w-full mx-auto flex justify-center items-center flex-col flex-1 py-20"
		>
			<UserIcon class="w-20 h-20 mx-auto text-green-500" />

			<form
				class="mt-8 w-full mx-auto max-w-xl grid gap-x-5 grid-cols-2"
				id="login-form"
				@submit="onHandleSubmit"
			>
				<div class="py-2">
					<span class="auth-input-label"> First Name </span>
					<div class="relative">
						<input
							placeholder="Jhon"
							type="text"
							class="auth-input"
							v-model="first_name"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-person-outline"></i>
						</div>
					</div>
					<span v-if="errors.first_name" class="auth-input-error">
						{{ errors.first_name }}
					</span>
				</div>
				<div class="py-2">
					<span class="auth-input-label"> Last Name </span>
					<div class="relative">
						<input
							placeholder="Deo"
							type="text"
							class="auth-input"
							v-model="last_name"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-person-outline"></i>
						</div>
					</div>
					<span v-if="errors.last_name" class="auth-input-error">
						{{ errors.last_name }}
					</span>
				</div>
				<div class="py-2">
					<span class="auth-input-label"> Email </span>
					<div class="relative">
						<input
							placeholder="user@email.com"
							type="text"
							class="auth-input"
							v-model="email"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-email-outline"></i>
						</div>
					</div>
					<span v-if="errors.email" class="auth-input-error">
						{{ errors.email }}
					</span>
				</div>
				<div class="py-2">
					<span class="auth-input-label"> Username </span>
					<div class="relative">
						<input
							placeholder="user@email.com"
							type="text"
							class="auth-input"
							v-model="username"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-email-outline"></i>
						</div>
					</div>
					<span v-if="errors.username" class="auth-input-error">
						{{ errors.username }}
					</span>
				</div>
				<div class="py-2" x-data="{ show: true }">
					<span class="auth-input-label">Password</span>
					<div class="relative">
						<input
							id="password"
							placeholder="................"
							:type="showPassword ? 'text' : 'password'"
							class="auth-input"
							v-model="password"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-lock-outline"></i>
						</div>
						<div
							class="absolute right-0 px-3 rounded-lg flex items-center text-2xl leading-5 text-gray-800 bg-white"
							@click="showPassword = !showPassword"
							style="top: 2px; bottom: 2px; right: 2px"
						>
							<i
								:class="`eva ${
									showPassword
										? 'eva-eye-off-outline'
										: 'eva-eye-outline'
								}`"
							></i>
						</div>
					</div>
					<span v-if="errors.password" class="auth-input-error">
						{{ errors.password }}
					</span>
				</div>
				<div class="py-2" x-data="{ show: true }">
					<span class="auth-input-label">Confirm Password</span>
					<div class="relative">
						<input
							id="confirm-password"
							placeholder="................"
							:type="showConfirmPassword ? 'text' : 'password'"
							class="auth-input"
							v-model="confirmPassword"
						/>
						<div class="auth-input-icon">
							<i class="eva eva-lock-outline"></i>
						</div>
						<div
							class="absolute right-0 px-3 rounded-lg flex items-center text-2xl leading-5 text-gray-800 bg-white"
							@click="showConfirmPassword = !showConfirmPassword"
							style="top: 2px; bottom: 2px; right: 2px"
						>
							<i
								:class="`eva ${
									showConfirmPassword
										? 'eva-eye-off-outline'
										: 'eva-eye-outline'
								}`"
							></i>
						</div>
					</div>
					<span v-if="errors.confirmPassword" class="auth-input-error">
						{{ errors.confirmPassword }}
					</span>
				</div>
				<div class="grid-cols-2 py-2" style="grid-column: 1 / span 2">
					<div class="relative inline-flex">
						<svg
							class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 412 232"
						>
							<path
								d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
								fill="#648299"
								fill-rule="nonzero"
							/>
						</svg>
						<select
							class="border-2 border-gray-300 rounded-lg text-gray-600 shadow-md h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none font-bold appearance-none"
							v-model="gender"
						>
							<option class="font-bold" value="male">Male</option>
							<option value="female" class="font-bold inline-block">
								Female
							</option>
							<option value="other" class="font-bold inline-block">
								Other
							</option>
						</select>
					</div>
					<label
						class="inline-flex items-center ml-4 text-sm font-bold"
						:class="errors.inputChecked && 'check-box-error'"
					>
						<input
							type="checkbox"
							class="h-5 w-5"
							v-model="inputChecked"
							checked
						/>
						<span
							:class="`select-none ml-3 inline-block capitalize ${
								inputChecked ? 'text-green-500' : 'text-red-500'
							}`"
						>
							I agree All the Trams and conditions
						</span>
					</label>
				</div>
				<div class="grid-cols-2 mt-4" style="grid-column: 1 / span 2">
					<button
						class="btn-gray-lg shadow-xl"
						type="submit"
						:disabled="isSubmitting"
					>
						<div class="loader" v-if="isSubmitting">
							<div class="loader-inner ball-pulse">
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
						<span v-else>Register</span>
					</button>
					<span class="block my-3 text-center font-bold text-lg text-gray-800">
						OR
					</span>
					<div class="text-center">
						<router-link class="auth-route-link" to="/login">
							Login Now
						</router-link>
					</div>
				</div>
			</form>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import UserIcon from '../components/utils/user-icon.vue';
import { registerSchema } from '../utils/schema';
import { useMutation } from '@urql/vue';
import gql from 'graphql-tag';
import omit from 'lodash/omit';
import { useToast } from 'vue-toastification';
import { REGISTER_USER } from '../typeDefs';

export default defineComponent({
	setup() {
		const router = useRouter();
		const showPassword = ref(false);
		const showConfirmPassword = ref(false);
		const toast = useToast();
		const formValues = {
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			username: '',
			confirmPassword: '',
			gender: 'male',
			inputChecked: false
		};
		const { handleSubmit, errors, resetForm } = useForm({
			initialValues: formValues,
			validationSchema: registerSchema
		});
		const { value: email } = useField('email');
		const { value: first_name } = useField('first_name');
		const { value: last_name } = useField('last_name');
		const { value: username } = useField('username');
		const { value: password } = useField('password');
		const { value: confirmPassword } = useField('confirmPassword');
		const { value: gender } = useField('gender');
		const { value: inputChecked } = useField('inputChecked');

		const { executeMutation, fetching: isSubmitting } = useMutation(REGISTER_USER);
		const onHandleSubmit = handleSubmit(val => {
			executeMutation({
				input: omit(val, ['confirmPassword', 'inputChecked'])
			}).then(result => {
				if (result.error) {
					toast.error(result.error.message);
				} else {
					toast.success('successfuly Register');
					resetForm();
					router.push({ name: 'verify-email-page' });
					window.localStorage.setItem('token', result.data.register.token);
				}
			});
		});
		return {
			showPassword,
			showConfirmPassword,
			onHandleSubmit,
			isSubmitting,
			errors,
			email,
			password,
			first_name,
			last_name,
			username,
			confirmPassword,
			gender,
			inputChecked
		};
	},
	components: {
		UserIcon
	}
});
</script>
