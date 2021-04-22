<template>
	<default-layout>
		<div class="py-4 px-5 container mx-auto">
			<div
				class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md container mx-auto h-40 flex items-center"
				role="alert"
			>
				<div class="flex w-full items-center">
					<div class="py-1">
						<svg
							class="fill-current h-10 w-10 text-teal-500 mr-4"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path
								d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
							/>
						</svg>
					</div>
					<div v-if="isVerifyMode">
						<div>
							<p class="font-bold text-lg capitalize">
								Account activating...
							</p>
							<p class="text-sm">
								please wait a momnet it will not take long.
							</p>
						</div>
					</div>
					<div v-else class="flex justify-between items-center w-full">
						<div>
							<p class="font-bold text-lg capitalize">
								{{ messages.titleMessage }}
							</p>
							<p class="text-sm">
								{{ messages.subMessage }}
							</p>
						</div>

						<div class="w-44 flex items-center justify-center">
							<div
								v-if="count < 60"
								class="text-center font-bold capitalize"
							>
								<span class="block text-sm">resend after</span>
								<div class="text-md text-3xl py-3 flex items-center">
									<span class="inline-block"> 00 : </span>
									<span class="inline-block countdown">
										<span :style="`--value: ${count}`"></span>
									</span>
								</div>
								<span class="block text-sm">finish</span>
							</div>
							<button
								class="bg-teal-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-28 h-11 flex justify-center items-center"
								type="button"
								:disabled="count !== 60 || loading"
								@click="startCountDown"
								v-else
							>
								<div v-if="loading" class="loader">
									<div
										class="loader-inner reset-button-loading semi-circle-spin"
									>
										<div></div>
									</div>
								</div>
								<span v-else> Resend</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, ref, inject, watchEffect, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMutation } from '@urql/vue';
import { RESEND_EMAIL_VERIFY_LINK, VERIFY_EMAIL } from '../typeDefs';
import { IUser } from '../utils/interface';
import { useToast } from 'vue-toastification';

export default defineComponent({
	setup() {
		const router = useRouter();
		const route = useRoute();
		const count = ref(60);
		const toast = useToast();
		const isVerifyMode = ref(!!route.query.email_token && !!route.query.user_id);
		const authUser = inject<{ value: { authUser: IUser } }>('authUser');
		const { executeMutation: sendVerifyEmail, fetching: loading } = useMutation(
			RESEND_EMAIL_VERIFY_LINK
		);
		const { executeMutation: verifyEmail } = useMutation(VERIFY_EMAIL);

		function start() {
			const interval = setInterval(() => {
				if (count.value <= 0) {
					count.value = 60;
					clearInterval(interval);
				} else {
					count.value--;
				}
			}, 1000);
		}
		function startCountDown() {
			if (count.value === 60 && authUser && authUser.value.authUser) {
				sendVerifyEmail({ userId: authUser.value.authUser.id }).then(result => {
					if (result.error) {
						toast.error(result.error.message);
					} else {
						start();
					}
				});
			}
		}
		const messages = ref({
			titleMessage:
				router.options.history.state.titleMessage || 'Confirm Your Email Address',
			subMessage:
				router.options.history.state.subMessage ||
				'We Just send confirmation email. please check you inbox or spam folder'
		});
		watchEffect(() => {
			if (authUser && authUser.value.authUser.email_verified) {
				router.push({ name: 'home-page' });
			}
		});

		onMounted(() => {
			if (!authUser?.value) return;
			else if (authUser.value.authUser.email_verified) return;
			if (isVerifyMode.value) {
				const input = {
					token: route.query.email_token,
					user_id: route.query.user_id
				};
				verifyEmail({ input }).then(result => {
					if (result.error) {
						toast.error(result.error.message);
					} else {
						toast.success('email verified');
						router.push('/');
					}
				});
			}
		});
		return {
			messages,
			startCountDown,
			count,
			loading,
			isVerifyMode
		};
	}
});
</script>

<style>
.reset-button-loading {
	width: 25px !important;
	height: 25px !important;
}
</style>
