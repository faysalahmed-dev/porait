<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, provide, readonly } from 'vue';
import { useQuery } from '@urql/vue';
import { AUTH_USER } from './typeDefs';

export default defineComponent({
	name: 'App',
	setup() {
		// const token = window.localStorage.getItem('token');
		const { fetching, data } = useQuery({
			query: AUTH_USER
			// pause: !!!token // turn into boolen
		});
		provide('authUser', data);
		provide('appLoading', readonly(fetching));

		return {};
	}
});
</script>
