<template>
	<section class="p-4">
		<Modal :showModal="showModal" @close-modal="showModal = false" />
		<div class="flex">
			<div class="avatar">
				<div class="rounded-btn w-24 h-24">
					<img :src="avater" />
				</div>
			</div>
			<div class="ml-4 flex flex-col justify-end">
				<p class="mb-3">Allowed JPG, GIF or PNG. Max size of 800kB</p>
				<div>
					<button
						class="btn btn-sm capitalize btn-primary"
						@click="showModal = true"
					>
						Upload
					</button>
				</div>
			</div>
		</div>
		<form class="grid gap-x-7 grid-cols-2 mt-4" @submit="onHandleSubmit">
			<form-input
				label="First Name"
				:error="errors.first_name"
				iconName="person-outline"
				name="first_name"
				placeholder="Jhon"
				:value="first_name"
				@on-input-change="handleInputChange"
			>
			</form-input>
			<form-input
				label="Last Name"
				:error="errors.last_name"
				iconName="person-outline"
				name="last_name"
				placeholder="Deo"
				:value="last_name"
				@on-input-change="handleInputChange"
			/>
			<form-input
				label="Email"
				:error="errors.email"
				iconName="email-outline"
				name="email"
				placeholder="username@example.com"
				:value="email"
				@on-input-change="handleInputChange"
			/>
			<form-input
				label="Username"
				:error="errors.username"
				iconName="email-outline"
				name="username"
				placeholder="jhon146"
				:value="username"
				@on-input-change="handleInputChange"
			/>
			<form-input
				label="Address"
				:error="errors.address"
				name="address"
				placeholder=""
				:value="address"
				@on-input-change="handleInputChange"
				formType="textarea"
				style="grid-column: 1 / span 2"
			/>
			<DropDown
				class="mt-4"
				@selectedItem="val => (gender = val)"
				:gender="gender"
				:error="errors.gender"
			/>

			<div
				class="grid-cols-2 mt-7 flex items-center"
				style="grid-column: 1 / span 2"
			>
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
					@click="resetForm"
				>
					Reset
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useToast } from 'vue-toastification';
import { useMutation } from '@urql/vue';
import { updateUserSchema } from '../../utils/schema';
import { IUser } from '../../utils/interface';
import Modal from '../utils/avater-upload.vue';
import FormInput from '../utils/form-input.vue';
import DropDown from '../utils/drop-down.vue';
import { UPDATE_USER_DATA } from '../../typeDefs';

type UserKeyType = 'gender' | 'email' | 'first_name' | 'last_name' | 'username';

export default defineComponent({
	setup(props, { emit }) {
		const showModal = ref(false);
		const authUser = inject<{ value: IUser }>('authUser');
		const toast = useToast();
		const { executeMutation, fetching: isSubmitting } = useMutation(UPDATE_USER_DATA);
		const avater = computed(() => authUser?.value.images.avater);
		const formValues = {
			first_name: authUser!.value.first_name.trim(),
			last_name: authUser!.value.last_name.trim(),
			email: authUser!.value.email.trim(),
			username: authUser!.value.username.trim(),
			gender: String(authUser!.value.gender),
			address: authUser?.value.address || ''
		};
		const { handleSubmit, errors, resetForm, setFieldValue } = useForm({
			initialValues: formValues,
			validationSchema: updateUserSchema
		});

		const { value: email } = useField<string>('email');
		const { value: first_name } = useField<string>('first_name');
		const { value: last_name } = useField<string>('last_name');
		const { value: username } = useField<string>('username');
		const { value: gender } = useField<string>('gender');
		const { value: address } = useField<string>('address');

		const handleInputChange = (inputValue: { name: UserKeyType; value: string }) =>
			setFieldValue(inputValue.name, inputValue.value);
		const onHandleSubmit = handleSubmit(input => {
			executeMutation({ data: input }).then(result => {
				if (result.error) {
					toast.error(result.error.message);
				} else {
					toast.success('successfuly updated');
					emit('reload');
				}
			});
		});
		return {
			showModal,
			email,
			first_name,
			last_name,
			username,
			gender,
			handleSubmit,
			errors,
			resetForm,
			avater,
			handleInputChange,
			onHandleSubmit,
			isSubmitting,
			address
		};
	},
	components: {
		Modal,
		FormInput,
		DropDown
	}
});
</script>
