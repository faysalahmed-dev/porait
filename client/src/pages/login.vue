<template>
	<default-layout>
		<div class="py-20">
			<div class="bg-neutral mx-auto p-8 rounded-2xl shadow-2xl w-96">
				<UserIcon class="w-20 h-20 mx-auto text-green-300" />
				<form class="mt-8" id="login-form" @submit="onHandleSubmit">
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Email / Username</span>
						</label>
						<div class="relative">
							<input
								placeholder="user@email.com"
								type="text"
								class="auth-input input"
								name="email"
								v-model="email"
							/>
							<div class="auth-input-icon">
								<i class="eva eva-email-outline"></i>
							</div>
						</div>
						<span v-if="errors.email" class="auth-input-error mt-3">
							{{ errors.email }}
						</span>
					</div>
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<div class="relative">
							<input
								id="password"
								name="password"
								placeholder="................"
								:type="showPassword ? 'text' : 'password'"
								class="auth-input input"
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
						<span v-if="errors.password" class="auth-input-error mt-3">
							{{ errors.password }}
						</span>
					</div>

					<div class="flex justify-between items-center">
						<div class="form-control">
							<label class="cursor-pointer label">
								<div>
									<input type="checkbox" checked class="checkbox" />
									<span
										style="transform: scaleX(-1)"
										class="checkbox-mark"
									></span>
								</div>
								<span class="ml-2 text-neutral-content">Remember me</span>
							</label>
						</div>
						<label class="block text-gray-500 font-bold my-4"
							><router-link
								to="/forget-password"
								class="cursor-pointer tracking-tighter border-b-1 text-yellow-300 opacity-80 hover:opacity-90"
								><span>Forgot Password?</span></router-link
							></label
						>
					</div>

					<button
						class="btn-green-lg shadow-xl"
						type="submit"
						:disabled="isSubmitting"
					>
						<div v-if="isSubmitting" class="loader">
							<div
								class="loader-inner auth-loading-spiner semi-circle-spin mx-auto"
							>
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
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useMutation } from '@urql/vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import { loginSchema } from '../utils/schema';
import UserIcon from '../components/utils/user-icon.vue';
import { LOGIN_USER } from '../typeDefs/index';

export default defineComponent({
	setup() {
		const showPassword = ref(false);
		const toast = useToast();
		const router = useRouter();
		const route = useRoute();
		const formValues = {
			email: '',
			password: ''
		};
		const { handleSubmit, errors, resetForm } = useForm({
			initialValues: formValues,
			validationSchema: loginSchema
		});
		const { value: email } = useField<string>('email');
		const { value: password } = useField<string>('password');

		const executeAuthQuery = inject<Function>('executeAuthQuery');

		const { executeMutation, fetching: isSubmitting } = useMutation(LOGIN_USER);

		const onHandleSubmit = handleSubmit(value => {
			executeMutation({ input: value }).then(result => {
				if (result.error) {
					toast.error(result.error.message);
				} else {
					toast.success('successfuly Login');
					resetForm();
					if (!result.data.login.email_verified) {
						router.push({
							name: 'verify-email-page',
							state: {
								titleMessage: 'Account Not Active Yet',
								subMessage: 'please confirm your email address'
							}
						});
					} else {
						const { callback } = route.query;
						const redir = typeof callback === 'string' ? callback : '/';
						router.push(redir);
					}
					window.localStorage.setItem('token', result.data.login.token);
					// @ts-ignore
					executeAuthQuery();
				}
			});
		});
		return {
			showPassword,
			onHandleSubmit,
			isSubmitting,
			errors,
			email,
			password
		};
	},
	components: {
		UserIcon
	}
});
</script>
