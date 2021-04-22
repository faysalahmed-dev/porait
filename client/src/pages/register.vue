<template>
	<default-layout>
		<div class="py-20">
			<div
				class="bg-neutral mx-auto p-8 rounded-2xl shadow-2xl"
				style="max-width: 700px"
			>
				<UserIcon class="w-20 h-20 mx-auto text-green-300" />
				<form
					class="mt-8 grid gap-x-7 grid-cols-2"
					id="login-form"
					@submit="onHandleSubmit"
				>
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">First Name</span>
						</label>
						<div class="relative">
							<input
								placeholder="Jhon"
								type="text"
								class="auth-input input"
								v-model="first_name"
							/>
							<div class="auth-input-icon">
								<i class="eva eva-person-outline"></i>
							</div>
						</div>
						<span v-if="errors.first_name" class="auth-input-error mt-3">
							{{ errors.first_name }}
						</span>
					</div>
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Last Name</span>
						</label>
						<div class="relative">
							<input
								placeholder="Deo"
								type="text"
								class="auth-input input"
								v-model="last_name"
							/>
							<div class="auth-input-icon">
								<i class="eva eva-person-outline"></i>
							</div>
						</div>
						<span v-if="errors.last_name" class="auth-input-error mt-3">
							{{ errors.last_name }}
						</span>
					</div>
					<div class="form-control py-2">
						<label class="label">
							<span class="label-text">Email</span>
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
							<span class="label-text">Username</span>
						</label>
						<div class="relative">
							<input
								placeholder="jhone146"
								type="text"
								class="auth-input input"
								v-model="username"
							/>
							<div class="auth-input-icon">
								<i class="eva eva-email-outline"></i>
							</div>
						</div>
						<span v-if="errors.username" class="auth-input-error mt-3">
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
								placeholder="................"
								:type="showPassword ? 'text' : 'password'"
								v-model="password"
								class="auth-input input"
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
					<div class="form-control py-2 mb-5">
						<label class="label">
							<span class="label-text">Confirm Password</span>
						</label>
						<div class="relative">
							<input
								id="confirm-password"
								placeholder="................"
								:type="showConfirmPassword ? 'text' : 'password'"
								v-model="confirmPassword"
								class="auth-input input"
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
					<DropDown
						@selectedItem="selectedItem"
						:gender="gender"
						:error="errors.gender"
					/>
					<div class="grid-cols-2 py-2" style="grid-column: 1 / span 2">
						<div class="form-control mb-2 mt-4">
							<label class="cursor-pointer label justify-center">
								<div>
									<input
										type="checkbox"
										v-model="inputChecked"
										checked
										class="checkbox"
									/>
									<span
										style="transform: scaleX(-1)"
										class="checkbox-mark"
									></span>
								</div>
								<span
									:class="[
										'select-none ml-3 inline-block capitalize',
										inputChecked
											? 'text-green-300'
											: errors.inputChecked
											? 'text-yellow-400'
											: 'text-neutral-content'
									]"
									>I agree All the Trams and conditions</span
								>
							</label>
						</div>
					</div>
					<div class="grid-cols-2 mt-4" style="grid-column: 1 / span 2">
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
							<span v-else>Register</span>
						</button>

						<span
							class="block my-3 text-center font-bold text-lg text-gray-800"
						>
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
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import UserIcon from '../components/utils/user-icon.vue';
import { registerSchema } from '../utils/schema';
import { useMutation } from '@urql/vue';
import DropDown from '../components/utils/drop-down.vue';
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
			gender: '',
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

		function selectedItem(val: string) {
			gender.value = val;
		}

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
			inputChecked,
			selectedItem
		};
	},
	components: {
		UserIcon,
		DropDown
	}
});
</script>
