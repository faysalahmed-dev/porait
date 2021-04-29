<template>
	<section class="p-4">
		<div v-if="loadingDeviceInfo" class="flex items-center justify-center py-28">
			<loading-spiner size="4x"></loading-spiner>
		</div>
		<template v-else>
			<h2 class="font-bold capitalize text-center py-3">
				{{ message }}
				<router-link
					class="text-green-400 underline"
					v-if="!authUser.email_verified"
					to="/verify-email"
				>
					verify now
				</router-link>
			</h2>

			<h2 class="font-bold text-lg px-4 mt-8">Current device</h2>
			<div
				v-if="currentDevice"
				class="bg-green-300 text-gray-700 card font-bold mt-6 p-4 text-sm w-60"
			>
				<p>{{ currentDevice.agent }}</p>
				<span class="inline-block my-2"
					>IP Address: {{ currentDevice.ip_address }}</span
				>
				<div class="flex items-center">
					<div class="avatar">
						<div class="w-6 h-4">
							<img
								class="w-full h-full"
								:src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${currentDevice.details.country}.svg`"
							/>
						</div>
					</div>

					<span class="ml-3">- {{ currentDevice.details.timezone }}</span>
				</div>
			</div>
			<section class="py-6">
				<div class="flex items-center justify-between mt-8 px-4">
					<h2 class="font-bold text-lg">Devices logged in</h2>
					<button
						class="btn btn-sm"
						:disabled="loading || !loggedInDevices.length"
						@click="logoutAllDevices"
					>
						<loading-spiner :loading="loading">
							<span>Logout All</span>
						</loading-spiner>
					</button>
				</div>
				<div class="flex flex-wrap" v-if="loggedInDevices.length">
					<div
						v-for="device in loggedInDevices"
						:key="Math.random() + device.agent"
						class="card badge-primary font-bold mt-6 p-4 text-sm w-56 m-3"
					>
						<p>{{ device.agent }}</p>
						<span class="inline-block my-2"
							>IP Address: {{ device.ip_address }}</span
						>
						<div class="flex items-center">
							<div class="avatar">
								<div class="w-6 h-4">
									<img
										class="w-full h-full"
										:src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${device.details.country}.svg`"
									/>
								</div>
							</div>
							<span class="ml-3">- {{ device.details.timezone }}</span>
						</div>
					</div>
				</div>
				<div class="py-8 opacity-70 text-center" v-else>
					<h3 class="text-sm">No other devices logged in</h3>
				</div>
			</section>
		</template>
	</section>
</template>
<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { useQuery, useMutation } from '@urql/vue';
import { useToast } from 'vue-toastification';
import { IUser } from '../../utils/interface';
import { GET_LOGGED_IN_DEVICES, LOGGED_OUT_ALL_DEVICES } from '../../typeDefs';

export default defineComponent({
	setup(props, { emit }) {
		const authUser = inject<{ value: IUser }>('authUser');
		const toast = useToast();
		const message = computed(() => {
			if (authUser?.value.email_verified) return 'Your Email is Verified';
			return 'Your Email Is Not Verified yet.';
		});
		const { data, fetching: loadingDeviceInfo } = useQuery({
			query: GET_LOGGED_IN_DEVICES,
			requestPolicy: 'network-only'
		});
		const { executeMutation, fetching: loading } = useMutation(
			LOGGED_OUT_ALL_DEVICES
		);

		const loggedInDevices = computed(() =>
			data.value ? data.value.loggedInDevices.logged_in_devices : []
		);
		const currentDevice = computed(() =>
			data.value ? data.value.loggedInDevices.current_device : null
		);

		const logoutAllDevices = () => {
			executeMutation({}).then(result => {
				if (result.error) {
					toast.error('some thing went. try again');
				} else {
					toast.success('logout all devices');
					emit('reload');
				}
			});
		};

		return {
			authUser,
			message,
			loggedInDevices,
			currentDevice,
			logoutAllDevices,
			loading,
			loadingDeviceInfo
		};
	}
});
</script>

<style></style>
