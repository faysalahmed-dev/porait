<template>
	<section class="p-4">
		<form class="w-8/12 mx-auto mt-4" @submit="onHandleSubmit">
			<form-input
				label="Old Password"
				:error="errors.oldPassword"
				iconName="lock-outline"
				name="oldPassword"
				placeholder="........"
				:value="oldPassword"
				@on-input-change="handleInputChange"
				type="password"
				passwordEye
			>
			</form-input>
			<form-input
				label="New Password"
				:error="errors.newPassword"
				iconName="lock-outline"
				name="newPassword"
				placeholder="........"
				:value="newPassword"
				@on-input-change="handleInputChange"
				type="password"
				passwordEye
			/>
			<form-input
				label="Confirm Password"
				:error="errors.confirmPassword"
				iconName="lock-outline"
				name="confirmPassword"
				placeholder="......."
				:value="confirmPassword"
				@on-input-change="handleInputChange"
				type="password"
				passwordEye
			/>

			<div class="mt-7 mb-4 flex items-center">
				<button
					class="btn-green rounded-2xl font-bold w-24"
					type="submit"
					:disabled="isSubmitting"
				>
					<div v-if="isSubmitting" class="loader">
						<div
							class="loader-inner semi-circle-spin mx-auto"
							style="width: 22px; height: 22px"
						>
							<div></div>
						</div>
					</div>
					<span v-else>Save</span>
				</button>
				<button
					class="btn-gray-light font-bold w-24 ml-4"
					:disabled="isSubmitting"
					type="button"
					@click="resetPasswordForm"
				>
					Reset
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useToast } from 'vue-toastification';
import { useMutation } from '@urql/vue';
import { updateUserPasswordSchema } from '../../utils/schema';
import FormInput from '../utils/form-input.vue';
import { UPDATE_PASSWORD } from '../../typeDefs';

export default defineComponent({
	setup(props, { emit }) {
		const toast = useToast();
		const { executeMutation, fetching: isSubmitting } = useMutation(UPDATE_PASSWORD);

		const formValues = {
			newPassword: '',
			oldPassword: '',
			confirmPassword: ''
		};
		const {
			handleSubmit,
			errors,
			resetForm,
			setFieldValue,
			values: passwordChangeValues
		} = useForm({
			initialValues: formValues,
			validationSchema: updateUserPasswordSchema
		});

		const { value: newPassword } = useField<string>('newPassword');
		const { value: oldPassword } = useField<string>('oldPassword');
		const { value: confirmPassword } = useField<string>('confirmPassword');

		const handleInputChange = (inputValue: {
			name: keyof typeof passwordChangeValues;
			value: string;
		}) => setFieldValue(inputValue.name, inputValue.value);

		const resetPasswordForm = () => {
			resetForm();
			emit('reload');
		};

		const onHandleSubmit = handleSubmit(input => {
			executeMutation({
				data: {
					currentPassword: input.oldPassword,
					newPassword: input.newPassword
				}
			}).then(result => {
				if (result.error) {
					toast.error(result.error.message);
				} else {
					toast.success('successfuly updated');
					resetPasswordForm();
					window.localStorage.setItem(
						'token',
						result.data.updatePassword.token
					);
				}
			});
		});
		return {
			newPassword,
			oldPassword,
			confirmPassword,
			handleSubmit,
			errors,
			resetPasswordForm,
			handleInputChange,
			onHandleSubmit,
			isSubmitting
		};
	},
	components: {
		FormInput
	}
});
</script>
