<template>
	<default-layout>
		<div class="container mx-auto py-5 px-3">
			<h3 class="font-bold text-lg my-4 text-green-500 capitalize">
				To Recover Your account please search your account bia email address
			</h3>
			<div class="w-80 mt-5 mx-auto">
				<input
					type="text"
					id="email"
					name="email"
					placeholder="user@example.com"
					class="search-input"
				/>
				<button class="btn-gray-lg">Search</button>
			</div>
		</div>
	</default-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	components: {}
});
</script>
