<template>
	<div
		class="flex items-center ml-3 py-1 px-2 bg-green-300 rounded-full cursor-pointer relative"
	>
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				:class="open ? '' : 'text-opacity-90'"
				class="inline-flex items-center px-3 rounded-md group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-gray-700"
			>
				<span class="inline-block font-bold mr-3 capitalize">{{
					user.name
				}}</span>
				<div
					class="w-12 h-12 border-2 border-green-500 rounded-full overflow-hidden"
				>
					<img
						:src="user.image"
						alt=""
						class="block h-full object-cover w-full"
					/>
				</div>
				<span
					class="absolute -bottom-1 left-1/2"
					style="transform: translateX(-50%)"
					><i class="eva eva-arrow-down eva-lg"></i
				></span>
			</PopoverButton>

			<transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="translate-y-1 opacity-0"
				enter-to-class="translate-y-0 opacity-100"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="translate-y-0 opacity-100"
				leave-to-class="translate-y-1 opacity-0"
			>
				<PopoverPanel
					class="absolute z-10 w-60 mt-3 transform -translate-x-1/2 left-1/2"
				>
					<div
						class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
					>
						<div class="relative bg-green-300 py-4 px-3">
							<router-link
								:to="item.href"
								v-for="item in items"
								:key="item.name"
								class="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-green-400 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50 font-bold"
							>
								<div
									class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-600 sm:h-12 sm:w-12"
								>
									<div v-html="item.icon"></div>
								</div>
								<div class="ml-4">
									<p class="text-gray-800">
										{{ item.name }}
									</p>
								</div>
							</router-link>
							<button
								@click.stop="$emit('logoutUser')"
								class="flex items-center p-2 w-full transition duration-150 ease-in-out rounded-lg hover:bg-green-400 focus:outline-none focus-visible:ring focus-visible:ring-opacity-50 font-bold"
							>
								<div
									class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-600 ml-1.5"
								>
									<div>
										<i
											class="eva inline-block eva-lg -mt-1 eva-log-out-outline"
											style="transform: translateY(3px)"
										></i>
									</div>
								</div>
								<div class="ml-4 flex w-full items-center">
									<p class="text-gray-800">Logout</p>
									<div v-if="loading" class="loader ml-3">
										<div
											class="loader-inner loading-spiner semi-circle-spin"
										>
											<div></div>
										</div>
									</div>
								</div>
							</button>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';

export default {
	props: ['user', 'loading'],
	setup() {
		return {
			items: [
				{
					name: 'Post',
					href: '/posts',
					icon: `
						<i class="eva inline-block eva-lg -mt-1 eva-layout-outline translate-y-0.5 transform" style="transform: translateY(3px)"></i>
          			`
				},
				{
					name: 'Comments',
					description: 'Create your own targeted content',
					href: '/comments',
					icon: `
            			<i
							class="eva inline-block eva-lg -mt-1 eva-message-circle-outline translate-y-0.5 transform"
							style="transform: translateY(3px)"
						></i>
         			 `
				},
				{
					name: 'Profile',
					href: '/profile',
					icon: `
           				<i
							class="eva inline-block eva-lg -mt-1 eva-person-outline translate-y-0.5 transform"
							style="transform: translateY(3px)"
						></i>
          			`
				},
				{
					name: 'Setting',
					href: '/setting',
					icon: `
            			<i
							class="eva inline-block eva-lg -mt-1 eva-settings-2-outline"
							style="transform: translateY(3px)"
						></i>
          			`
				}
			]
		};
	},
	components: { Popover, PopoverButton, PopoverPanel }
};
</script>
