<template>
	<default-layout>
		<div class="container mx-auto p-4 text-gray-600">
			<div class="mx-auto flex bg-green-100 h-40 mt-5 rounded overflow-hidden">
				<div
					class="flex justify-center items-center w-44 text-green-500 bg-green-200"
				>
					<i class="eva eva-alert-triangle eva-2x"></i>
				</div>
				<div
					class="font-bold py-4 px-2 text-lg capitalize text-center leading-8 flex items-center"
				>
					We Just send you confirmation email to your email address. please
					check you inbox or spam folder.
				</div>
				<div class="w-44 bg-green-200 flex items-center justify-center">
					<div v-if="count < 60" class="text-center font-bold capitalize">
						<span class="block text-sm">resend after</span>
						<span class="block text-md text-3xl my-2">0:{{ count }}</span>
						<span class="block text-sm">finish</span>
					</div>
					<button
						v-else
						:disabled="count !== 60"
						@click="startCountDown"
						class="border-2 border-green-500 py-2 px-3 rounded font-bold focus:outline-none hover:border-green-600 transition-all ease-in-out duration-200"
					>
						Resend
					</button>
				</div>
			</div>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	data() {
		return {
			count: 60
		};
	},
	methods: {
		start() {
			const interval = setInterval(() => {
				if (this.count <= 0) {
					this.count = 60;
					clearInterval(interval);
				} else {
					this.count--;
				}
			}, 1000);
		},
		startCountDown() {
			if (this.count === 60) {
				this.start();
			}
		}
	}
});
</script>
