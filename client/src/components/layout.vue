<template>
	<div
		v-if="loading"
		class="h-screen w-screen fixed flex flex-col justify-center items-center"
	>
		<h2 class="text-green-500 inline-block font-extrabold text-5xl mb-16">
			<span class="text-gray-800">P</span>orait
		</h2>
		<div class="loader">
			<div class="loader-inner ball-spin-fade-loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
	<div v-else class="flex flex-col min-h-screen">
		<Header />
		<main class="flex-grow">
			<slot></slot>
		</main>
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import Header from './header.vue';
import Footer from './footer.vue';
export default defineComponent({
	name: 'app-layout',
	components: {
		Header,
		Footer
	},
	setup() {
		const loading = inject<{ value: boolean }>('appLoading');
		return { loading };
	}
});
</script>

<style>
.ball-spin-fade-loader > div {
	background-color: theme('backgroundColor.green.500') !important;
}
</style>
