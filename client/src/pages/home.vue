<template>
	<default-layout>
		<h1 class="text-3xl font-bold text-center text-green-500">Home</h1>
		<router-link class="btn btn-primary" to="/color">color</router-link>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import { themeChange } from 'theme-change';
export default defineComponent({
	setup() {
		return {};
	},
	mounted() {
		// themeChange();
	}
});
</script>
