<template>
	<div
		v-if="loading"
		class="h-screen w-screen fixed flex flex-col justify-center items-center"
	>
		<h2 class="text-green-300 inline-block font-extrabold text-5xl mb-16">
			<span class="text-yellow-200">P</span>orait
		</h2>
		<div class="loader page-loading-spiner">
			<div class="loader-inner semi-circle-spin mx-auto">
				<div></div>
			</div>
		</div>
	</div>
	<div v-else class="flex flex-col min-h-screen p-6">
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
	name: 'default-layout',
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

<style scoped>
.page-loading-spiner .loader-inner {
	width: 50px;
	height: 50px;
}
</style>
