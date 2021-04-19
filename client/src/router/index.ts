import * as VueRouter from 'vue-router';
import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import ForgetPassword from '@/pages/forget-password.vue';
import PasswordReset from '@/pages/password-reset.vue';
import PageNotFound from '@/pages/404.vue';
import EmailVerify from '@/pages/email-verify.vue';

import { client } from '../client';
import { AUTH_USER } from '../typeDefs';

function checkQuery(to: any, form: any, next: any) {
	if (to.query.user_id && to.query.token) {
		next();
	} else {
		next({ name: '404-page' });
	}
}

const routes: VueRouter.RouteRecordRaw[] = [
	{
		path: '/',
		name: 'home-page',
		component: Home
	},
	{ path: '/login', name: 'login-page', component: Login },
	{ path: '/register', name: 'register-page', component: Register },
	{ path: '/forget-password', name: 'forget-password-page', component: ForgetPassword },
	{
		path: '/password-reset',
		name: 'password-reset-page',
		component: PasswordReset,
		beforeEnter: [checkQuery]
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404-page',
		component: PageNotFound
	},
	{
		path: '/verify-email',
		name: 'verify-email-page',
		component: EmailVerify,
		meta: {
			requiresAuth: true
		}
	}
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
	strict: true
});

router.beforeResolve((to, from, next) => {
	if (to.meta.requiresAuth) {
		client
			.query(AUTH_USER)
			.toPromise()
			.then(result => {
				if (result.data && !result.error) {
					next();
				} else {
					next({ name: 'login-page', query: { callback: to.fullPath } });
				}
			});
	} else {
		next();
	}
});

export default router;
