<template>
	<div>
		<Menu as="div" class="relative text-left">
			<div>
				<MenuButton
					class="input btn btn-block text-white focus:outline-none focus-visible:ring-3 focus-visible:ring-white focus-visible:ring-opacity-75 capitalize shadow-2xl"
					:class="error && 'btn-warning'"
				>
					{{ gender || 'Gender' }}
					<i class="eva eva-chevron-down-outline eva-lg"></i>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute w-56 mt-2 origin-top-right bg-dark-input rounded-md shadow-lg focus:outline-none p-2"
				>
					<div class="p-3">
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active && 'bg-neutral',
									' group flex rounded-md items-center w-full px-2 py-2 text-sm'
								]"
								type="button"
								@click.prevent="$emit('selectedItem', 'male')"
							>
								Male
							</button>
						</MenuItem>
					</div>
					<div class="p-3">
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active && 'bg-neutral',
									'group flex rounded-md items-center w-full px-2 py-2 text-sm'
								]"
								type="button"
								@click.prevent="$emit('selectedItem', 'female')"
							>
								Female
							</button>
						</MenuItem>
					</div>
					<div class="p-3">
						<MenuItem v-slot="{ active }">
							<button
								@click.prevent="$emit('selectedItem', 'other')"
								:class="[
									active && 'bg-neutral',
									'group flex rounded-md items-center w-full px-2 py-2 text-sm'
								]"
								type="button"
							>
								Other
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['gender', 'error'],
	components: {
		Menu,
		MenuButton,
		MenuItems,
		MenuItem
	}
});
</script>
