<template>
	<default-layout>
		<div class="container mx-auto py-5 pl-8">
			<h1 class="text-9xl text-yellow-500">404</h1>
			<p class="font-bold text-xl text-yellow-500">
				Ooops you've just lost. page doesn't exits
			</p>
			<router-link :to="navigate" class="btn-green mt-6 inline-block">
				<i class="eva eva-arrow-back-outline eva-lg mr-1 mt-1"></i>
				Navigate back
			</router-link>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	setup() {
		const router = useRouter();
		const navigate = computed(() => router.options.history.state.back || '/');
		return { navigate };
	}
});
</script>
