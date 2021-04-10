<template>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex-grow">
			<slot></slot>
		</main>
		<Footer />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './header.vue';
import Footer from './footer.vue';
export default defineComponent({
	name: 'app-layout',
	components: {
		Header,
		Footer
	}
});
</script>
