<template>
	<default-layout>
		<form class="container mx-auto py-5 px-3" @submit="onHandleSubmit">
			<h3 class="font-bold text-lg my-4 text-gray-800 capitalize text-center">
				Type Your New Password
			</h3>
			<div class="w-80 mt-5 mx-auto">
				<div class="py-2">
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
				<div class="py-2">
					<span class="auth-input-label">Confirm Password</span>
					<div class="relative">
						<input
							id="confirmPassword"
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
					<span v-else>Submit</span>
				</button>
			</div>
		</form>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@urql/vue';
import { VERIFY_RESET_PASSWORD } from '../typeDefs';
import { resetPasswordSchema } from '../utils/schema';
import { useForm, useField } from 'vee-validate';
import { useToast } from 'vue-toastification';
import { useRouter, useRoute } from 'vue-router';
import pick from 'lodash/pick';

export default defineComponent({
	setup() {
		const toast = useToast();
		const showPassword = ref(false);
		const showConfirmPassword = ref(false);
		const route = useRoute();
		const router = useRouter();

		const { handleSubmit, errors } = useForm({
			initialValues: { password: '', confirmPassword: '' },
			validationSchema: resetPasswordSchema
		});
		const { value: password } = useField('password');
		const { value: confirmPassword } = useField('confirmPassword');
		const { executeMutation, fetching: isSubmitting } = useMutation(
			VERIFY_RESET_PASSWORD
		);
		const onHandleSubmit = handleSubmit(value => {
			const input = {
				password: value.password,
				...pick(route.query, ['token', 'user_id'])
			};
			executeMutation({ input }).then(result => {
				if (result.error) {
					toast.error(result.error.message);
				} else {
					toast.success('password updated');
					router.push({ name: 'login-page' });
				}
			});
		});
		return {
			onHandleSubmit,
			isSubmitting,
			errors,
			password,
			confirmPassword,
			showPassword,
			showConfirmPassword
		};
	}
});
</script>
