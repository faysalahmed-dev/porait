import 'vue-router';

declare module 'vue-router' {
	export interface RouteMeta {
		requiresAuth?: boolean;
		publicOnly?: boolean;
	}
}
