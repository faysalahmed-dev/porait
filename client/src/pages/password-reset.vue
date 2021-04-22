<template>
	<default-layout>
		<div class="py-20">
			<div class="bg-neutral mx-auto p-8 rounded-2xl shadow-2xl w-96">
				<UserIcon class="w-20 h-20 mx-auto text-green-300" />
				<form class="mt-8" @submit="onHandleSubmit">
					<h3
						class="font-bold text-lg my-4 text-neutral-content capitalize text-center"
					>
						Type Your New Password
					</h3>
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Password</span>
						</label>
						<div class="relative">
							<input
								id="password"
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
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Confirm Password</span>
						</label>
						<div class="relative">
							<input
								id="confirm-password"
								placeholder="................"
								:type="showConfirmPassword ? 'text' : 'password'"
								class="auth-input input"
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
						<span v-if="errors.confirmPassword" class="auth-input-error mt-3">
							{{ errors.confirmPassword }}
						</span>
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
						<span v-else>Submit</span>
					</button>
				</form>
			</div>
		</div>
	</default-layout>
</template>

<script lang="ts">
import UserIcon from '../components/utils/user-icon.vue';
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
	},
	components: {
		UserIcon
	}
});
</script>

<style scoped>
input:placeholder {
	font-size: 30px;
}
</style>
