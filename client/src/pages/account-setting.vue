<template>
	<default-layout>
		<div class="flex py-3 space-x-3">
			<div class="w-4/12"><SettionManu /></div>
			<div class="flex-auto rounded-lg bg-neutral"><router-view></router-view></div>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SettionManu from '../components/setting-manu.vue';

export default defineComponent({
	components: { SettionManu }
});
</script>
