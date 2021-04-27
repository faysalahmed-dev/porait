<template>
	<section class="p-4">
		<Modal :showModal="showModal" @close-modal="showModal = false" />
		<div class="flex" v-if="user">
			<div class="avatar">
				<div class="rounded-btn w-24 h-24">
					<img :src="user.avater" />
				</div>
			</div>
			<div class="ml-4 flex flex-col justify-end">
				<p class="mb-3">Allowed JPG, GIF or PNG. Max size of 800kB</p>
				<div>
					<button
						class="btn btn-sm capitalize btn-primary"
						@click="showModal = true"
					>
						Upload
					</button>
					<button class="btn btn-sm capitalize">Reset</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed } from 'vue';
import { IUser } from '../../utils/interface';
import Modal from '../utils/avater-upload.vue';

export default defineComponent({
	setup() {
		const showModal = ref(false);
		const authUser = inject<{ value: IUser }>('authUser');
		const user = computed(() => {
			if (!authUser?.value) return null;
			return {
				avater: authUser?.value.images.avater
			};
		});
		return { showModal, user };
	},
	components: {
		Modal
	}
});
</script>
