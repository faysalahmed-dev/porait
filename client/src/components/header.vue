<template>
	<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box p-4">
		<div class="flex-1">
			<router-link
				to="/"
				class="text-green-300 inline-block font-extrabold text-3xl"
			>
				<span class="text-yellow-200">P</span>orait
			</router-link>
		</div>
		<div class="w-72 mr-2">
			<div class="form-control w-full">
				<input type="text" placeholder="@user, #post" class="input input-ghost" />
			</div>
		</div>
		<div class="flex-none">
			<button class="btn btn-square btn-ghost text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
			</button>
		</div>
		<PopOver
			v-if="!!user"
			:user="user"
			:loading="logouting"
			@logoutUser="logoutUser"
		/>
		<div v-else>
			<router-link to="/login" class="btn ml-4"> Login </router-link>
			<router-link to="/register" class="btn text-green-400 ml-4">
				Register
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue';
import _ from 'lodash';
import { IUser } from '../utils/interface';
import { useMutation } from '@urql/vue';
import { LOGOUT_USER } from '../typeDefs/auth';
import { useToast } from 'vue-toastification';
import PopOver from './utils/pop-over.vue';

export default defineComponent({
	setup() {
		const showModel = ref(false);
		const toast = useToast();
		const authUser = inject<{ value: { authUser: IUser } }>('authUser');
		const { executeMutation, fetching: logouting } = useMutation(LOGOUT_USER);
		const user = computed(() => {
			if (authUser!.value) {
				return {
					name:
						authUser!.value.authUser.first_name.trim() +
						' ' +
						authUser!.value.authUser.last_name.trim(),
					image: authUser!.value.authUser.images.avater
				};
			} else {
				return null;
			}
		});
		async function logoutUser() {
			try {
				await executeMutation({});
				toast.success('Logout Successful');
				window.localStorage.clear();
				window.location.href = '/';
			} catch (err) {
				console.log(err);
				toast.success('Unable to Logout');
			}
		}
		return {
			showModel,
			user,
			logoutUser,
			logouting
		};
	},
	components: { PopOver }
});
</script>

<style>
.loading-spiner {
	width: 20px !important;
	height: 20px !important;
	margin-left: 10px;
}
header ul li {
	transition: all 0.2 ease-in-out;
}
header ul li:hover {
	box-shadow: 0px 0px 4px 0px #0000003d;
}
</style>
