<template>
	<default-layout>
		<div
			class="container max-w-full mx-auto flex justify-center items-center flex-col flex-1 py-20"
		>
			<UserIcon class="w-20 h-20 mx-auto text-green-500" />

			<form class="mt-8 max-w-xs w-full" id="login-form" @submit="onHandleSubmit">
				<div class="py-2">
					<span class="auth-input-label"> Email / Username </span>
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
				<div class="py-2" x-data="{ show: true }">
					<span class="auth-input-label">Password</span>
					<div class="relative">
						<input
							id="password"
							name="password"
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
				<div class="flex justify-between">
					<label class="block text-gray-500 font-bold my-4"
						><input type="checkbox" class="leading-loose text-pink-600" />
						<span class="py-2 text-sm text-gray-600 leading-snug">
							Remember Me
						</span></label
					>
					<label class="block text-gray-500 font-bold my-4"
						><router-link
							to="/forget-password"
							class="cursor-pointer tracking-tighter text-gray-800 border-b-2 border-gray-400 hover:border-gray-700"
							><span>Forgot Password?</span></router-link
						></label
					>
				</div>
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
					<span v-else>Login</span>
				</button>
				<span class="block my-3 text-center font-bold text-lg text-gray-800">
					OR
				</span>
				<div class="text-center">
					<router-link class="auth-route-link" to="/register">
						Register Now
					</router-link>
				</div>
			</form>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import UserIcon from '../components/utils/user-icon.vue';
import { loginSchema } from '../utils/schema';
import { useMutation } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { loginMutation } from '../typeDefs/index';

export default defineComponent({
	setup() {
		const showPassword = ref(false);
		const toast = useToast();
		const router = useRouter();

		const formValues = {
			email: '',
			password: ''
		};
		const { handleSubmit, isSubmitting, errors, resetForm } = useForm({
			initialValues: formValues,
			validationSchema: loginSchema
		});
		const { value: email } = useField('email');
		const { value: password } = useField('password');

		const { mutate } = useMutation(loginMutation);

		const onHandleSubmit = handleSubmit(async value => {
			try {
				const userData = await mutate({ input: value });
				toast.success('successfuly Login');
				resetForm();
				if (!userData.data.login.email_verified) {
					router.push({
						name: 'verify-email-page',
						state: {
							message:
								"Your account doesn't active yet. please confirm your email address."
						}
					});
				} else {
					router.push({ name: 'home-page' });
				}
				return userData;
			} catch (err) {
				console.log(err);
				toast.error(err.message);
			}
		});
		return { showPassword, onHandleSubmit, isSubmitting, errors, email, password };
	},
	components: {
		UserIcon
	}
});
</script>

function loginGqlTag(loginGqlTag: any): { mutate: any; } { throw new Error('Function not
implemented.'); }
