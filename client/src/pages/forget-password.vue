<template>
	<default-layout>
		<form
			class="w-96 mt-16 bg-neutral rounded-2xl mx-auto py-8 px-4"
			@submit="onHandleSubmit"
		>
			<div v-if="showMessage" class="text-lg font-bold">
				<p>Link send to your email address</p>
				<button
					class="btn bg-green-300 text-gray-700 hover:text-white mt-4 btn-block shadow-xl"
					type="button"
					@click="showMessage = false"
				>
					Search Again
				</button>
			</div>
			<template v-else>
				<h3 class="font-bold text-lg text-neutral-content capitalize">
					Enter Your Email
				</h3>
				<div class="flex mt-5 mx-auto">
					<div class="mr-2 flex-1">
						<div class="form-control w-full">
							<input
								type="text"
								placeholder="user@example.com"
								class="input input-ghost text-lg"
								v-model="email"
							/>
							<span v-if="errors.email" class="auth-input-error mt-3">
								{{ errors.email }}
							</span>
						</div>
					</div>
					<div class="flex-none">
						<button
							class="btn btn-square btn-ghost text-white"
							:disabled="isSubmitting"
						>
							<div v-if="isSubmitting" class="loader">
								<div
									class="loader-inner auth-loading-spiner semi-circle-spin mx-auto"
								>
									<div></div>
								</div>
							</div>
							<svg
								v-else
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block w-6 h-6 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</template>
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
		const { handleSubmit, errors } = useForm({
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
