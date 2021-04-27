<template>
	<vue-progress-bar></vue-progress-bar>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, provide, readonly, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@urql/vue';
import { AUTH_USER } from './typeDefs';
import useProgress from './compose/useProgress';

export default defineComponent({
	name: 'App',
	setup() {
		const router = useRouter();
		const progress = useProgress();
		const token = window.localStorage.getItem('token');
		const { fetching, data, executeQuery } = useQuery({
			query: AUTH_USER,
			pause: !token // turn into boolen
		});
		const authUser = computed(() => (data.value ? data.value.authUser : null));
		provide('authUser', authUser);
		provide('appLoading', readonly(fetching));
		provide('executeAuthQuery', executeQuery);

		router.beforeEach((to, from, next) => {
			progress.start();
			next();
		});
		router.afterEach(() => {
			progress.finish();
		});
		onMounted(() => {
			progress.finish();
		});
		return {};
	}
});
</script>
