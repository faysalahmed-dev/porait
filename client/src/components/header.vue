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
			<PopOver
				v-if="!!user"
				:user="user"
				:loading="logouting"
				@logoutUser="logoutUser"
			/>
			<div v-else>
				<router-link to="/login" class="btn-green mt-4 md:mt-0 ml-4">
					Login
				</router-link>
				<router-link to="/register" class="btn-gray mt-4 md:mt-0 ml-4">
					Register
				</router-link>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue';
import _ from 'lodash';
import { IUser } from '../utils/interface';
import { useRouter } from 'vue-router';
import { useMutation } from '@urql/vue';
import { LOGOUT_USER } from '../typeDefs/auth';
import { useToast } from 'vue-toastification';
import PopOver from './utils/pop-over.vue';

export default defineComponent({
	setup() {
		const showModel = ref(false);
		const router = useRouter();
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
					image: JSON.parse(authUser!.value.authUser.images).avater
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
