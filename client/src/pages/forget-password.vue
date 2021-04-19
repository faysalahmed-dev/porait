<template>
	<default-layout>
		<form class="container mx-auto py-5 px-3" @submit="onHandleSubmit">
			<h3 class="font-bold text-lg my-4 text-green-500 capitalize">
				To Recover Your account please search your account bia email address
			</h3>
			<div
				v-if="showMessage"
				class="px-8 py-10 bg-green-200 text-lg font-bold text-gray-800 rounded"
			>
				Reset Password Link send to your email address
			</div>
			<div class="w-80 mt-5 mx-auto">
				<div class="relative">
					<input
						placeholder="user@email.com"
						type="text"
						class="search-input"
						v-model="email"
					/>
				</div>
				<span v-if="errors.email" class="auth-input-error">
					{{ errors.email }}
				</span>
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
					<span v-else>Search</span>
				</button>
			</div>
		</form>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@urql/vue';
import { FORGET_PASSWORD } from '../typeDefs/index';
import { forgetPasswordSchema } from '../utils/schema';
import { useForm, useField } from 'vee-validate';
import { useToast } from 'vue-toastification';

export default defineComponent({
	setup() {
		const toast = useToast();
		const showMessage = ref(false);
		const { handleSubmit, errors, resetForm } = useForm({
			initialValues: { email: '' },
			validationSchema: forgetPasswordSchema
		});
		const { value: email } = useField('email');
		const { executeMutation, fetching: isSubmitting } = useMutation(FORGET_PASSWORD);
		const onHandleSubmit = handleSubmit(async value => {
			showMessage.value = false;
			executeMutation({ input: value }).then(result => {
				if (result.error) {
					showMessage.value = false;
					toast.error(result.error.message);
				} else {
					showMessage.value = true;
				}
			});
		});
		return { onHandleSubmit, isSubmitting, errors, email, showMessage };
	}
});
</script>
