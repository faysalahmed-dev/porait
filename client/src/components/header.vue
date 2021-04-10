<template>
	<header class="text-gray-600">
		<div
			class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
		>
			<router-link
				to="/"
				class="text-green-500 inline-block font-extrabold text-3xl"
			>
				<span class="text-gray-800">P</span>orait
			</router-link>
			<div class="ml-auto w-72">
				<input
					type="text"
					id="full-name"
					name="full-name"
					placeholder="#post, @username"
					class="search-input"
				/>
			</div>
			<div v-if="true">
				<router-link to="/login" class="btn-green mt-4 md:mt-0 ml-4">
					Login
				</router-link>
				<router-link to="/register" class="btn-gray mt-4 md:mt-0 ml-4">
					Register
				</router-link>
			</div>
			<div
				v-else
				class="flex items-center ml-3 py-1 px-2 bg-green-200 rounded-full cursor-pointer relative"
				@click="showModel = !showModel"
			>
				<span class="inline-block font-bold mr-3">Faysal Ahmed</span>
				<div
					class="w-12 h-12 border-2 border-green-500 rounded-full overflow-hidden"
				>
					<img
						src="@/assets/faysal.jpg"
						alt=""
						class="block h-full object-cover w-full"
					/>
				</div>
				<span
					class="absolute -bottom-1 left-1/2"
					style="transform: translateX(-50%)"
					><i class="eva eva-arrow-down eva-lg"></i
				></span>
				<ul
					v-show="showModel"
					class="absolute bg-green-300 px-3 py-4 rounded shadow-md space-y-5 w-44 font-bold"
					style="top: 100%"
				>
					<li>
						<i
							class="eva inline-block eva-lg -mt-1 eva-layout-outline translate-y-0.5 transform"
							style="transform: translateY(3px)"
						></i>
						<span class="ml-2">Posts</span>
					</li>
					<li>
						<i
							class="eva inline-block eva-lg -mt-1 eva-message-circle-outline translate-y-0.5 transform"
							style="transform: translateY(3px)"
						></i>
						<span class="ml-2">Comments</span>
					</li>
					<li>
						<i
							class="eva inline-block eva-lg -mt-1 eva-person-outline translate-y-0.5 transform"
							style="transform: translateY(3px)"
						></i>
						<span class="ml-2">Profile</span>
					</li>
					<li>
						<i
							class="eva inline-block eva-lg -mt-1 eva-settings-2-outline"
							style="transform: translateY(3px)"
						></i>
						<span class="ml-2">Setting</span>
					</li>
					<li>
						<i
							class="eva inline-block eva-lg -mt-1 eva-log-out-outline"
							style="transform: translateY(3px)"
						></i>
						<span class="ml-2">Logout</span>
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
	setup() {
		const showModel = ref(false);
		return {
			showModel
		};
	}
});
</script>
