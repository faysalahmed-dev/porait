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
							name="first_name"
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
							name="last_name"
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
							name="email"
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
							name="username"
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
							name="password"
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
							name="confirmPassword"
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
import { defineComponent, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import UserIcon from '../components/utils/user-icon.vue';
import { registerSchema } from '../utils/schema';

export default defineComponent({
	setup() {
		const showPassword = ref(false);
		const showConfirmPassword = ref(false);
		const formValues = {
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			username: '',
			confirmPassword: ''
		};
		const { handleSubmit, isSubmitting, errors } = useForm({
			initialValues: formValues,
			validationSchema: registerSchema
		});
		const { value: email } = useField('email');
		const { value: first_name } = useField('first_name');
		const { value: last_name } = useField('last_name');
		const { value: username } = useField('username');
		const { value: password } = useField('password');
		const { value: confirmPassword } = useField('confirmPassword');
		const onHandleSubmit = handleSubmit(async value => {
			return new Promise((acc, val) => {
				setTimeout(acc, 2000);
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
			confirmPassword
		};
	},
	components: {
		UserIcon
	}
});
</script>
