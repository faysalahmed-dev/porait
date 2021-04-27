<template>
	<div class="form-control py-2">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<div class="relative">
			<textarea
				v-if="formType === 'textarea'"
				:placeholder="placeholder"
				cols="30"
				rows="15"
				class="auth-input input resize-none h-16"
				style="font-family: inherit; font-weight: bold"
				:value="value"
				@input="
					$emit('on-input-change', { name: name, value: $event.target.value })
				"
			></textarea>
			<input
				v-else
				:placeholder="placeholder"
				class="auth-input input"
				:value="value"
				@input="
					$emit('on-input-change', { name: name, value: $event.target.value })
				"
			/>
			<div class="auth-input-icon">
				<i :class="['eva', `eva-${iconName}`]"></i>
			</div>
		</div>
		<span v-if="error" class="auth-input-error mt-3">
			{{ error }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'form-input',
	props: {
		name: {
			type: String,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		error: {
			type: String || null,
			default: null
		},
		value: String,
		iconName: {
			type: String
		},
		placeholder: {
			type: String,
			default: ''
		},
		formType: {
			type: String,
			default: 'input'
		}
	},
	setup() {
		return {};
	}
});
</script>
