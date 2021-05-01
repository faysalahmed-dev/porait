<template>
	<default-layout>
		<h1 class="text-3xl font-bold text-center text-green-500">Home</h1>
		<router-link class="btn btn-primary" to="/color">color</router-link>
		<router-link to="/setting" class="btn btn-primary">account settion</router-link>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
	components: {}
});
</script>
