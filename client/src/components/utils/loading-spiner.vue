<template>
	<div v-if="loading" class="loader">
		<div :class="['loader-inner', `loader-${size}`, 'semi-circle-spin', 'mx-auto']">
			<div></div>
		</div>
	</div>
	<slot v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// type size = 'sm' | '1x' | '2x' | '3x' | '4x';

export default defineComponent({
	props: {
		size: {
			type: String,
			default: '1x',
			validator(value: string) {
				return ['sm', '1x', '2x', '3x', '4x'].includes(value);
			}
		},
		loading: {
			type: Boolean,
			default: true
		}
	}
});
</script>

<style scoped>
.loader-sm {
	width: 15px;
	height: 15px;
}

.loader-1x {
	width: 20px;
	height: 20px;
}
.loader-2x {
	width: 25px;
	height: 25px;
}
.loader-3x {
	width: 30px;
	height: 30px;
}
.loader-4x {
	width: 40px;
	height: 40px;
}
</style>
