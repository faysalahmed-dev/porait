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
				:type="inputType"
				@input="
					$emit('on-input-change', { name: name, value: $event.target.value })
				"
			/>
			<div class="auth-input-icon">
				<i :class="['eva', `eva-${iconName}`]"></i>
			</div>
			<div
				v-if="passwordEye"
				class="absolute right-0 px-3 rounded-lg flex items-center text-2xl leading-5 text-gray-800 bg-white"
				@click="showPassword = !showPassword"
				style="top: 2px; bottom: 2px; right: 2px"
			>
				<i
					:class="`eva ${
						showPassword ? 'eva-eye-off-outline' : 'eva-eye-outline'
					}`"
				></i>
			</div>
		</div>
		<span v-if="error" class="auth-input-error mt-3">
			{{ error }}
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

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
		},
		type: {
			type: String,
			default: 'text'
		},
		passwordEye: {
			type: Boolean,
			default: false
		}
	},
	setup({ passwordEye, type }) {
		const showPassword = ref(false);
		const inputType = computed(() => {
			if (passwordEye) {
				return showPassword.value ? 'text' : 'password';
			}
			return type;
		});
		return { showPassword, inputType };
	}
});
</script>

<style scoped>
input[type='password']::placeholder {
	font-size: 30px;
}
</style>
