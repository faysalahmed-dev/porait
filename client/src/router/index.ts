import * as VueRouter from 'vue-router';
import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import ForgetPassword from '@/pages/forget-password.vue';
import PasswordReset from '@/pages/password-reset.vue';
import PageNotFound from '@/pages/404.vue';
import EmailVerify from '@/pages/email-verify.vue';
import UserSetting from '@/pages/account-setting.vue';

import UpdateUser from '@/components/user/update-user.vue';
import ChangePassword from '@/components/user/change-password.vue';
import Security from '@/components/user/security.vue';

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
	{
		path: '/login',
		name: 'login-page',
		component: Login,
		meta: {
			publicOnly: true
		}
	},
	{
		path: '/register',
		name: 'register-page',
		component: Register,
		meta: {
			publicOnly: true
		}
	},
	{
		path: '/forget-password',
		name: 'forget-password-page',
		component: ForgetPassword,
		meta: {
			publicOnly: true
		}
	},
	{
		path: '/password-reset',
		name: 'password-reset-page',
		component: PasswordReset,
		beforeEnter: [checkQuery],
		meta: {
			publicOnly: true
		}
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
	},
	{
		path: '/setting',
		component: UserSetting,
		meta: {
			requiresAuth: true
		},
		redirect: { name: 'update-user' },
		children: [
			{ path: 'general', name: 'update-user', component: UpdateUser },
			{
				path: 'change-password',
				name: 'change-password',
				component: ChangePassword
			},
			{
				path: 'security',
				name: 'security',
				component: Security
			}
		]
	}
];

const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
	strict: true
});

const getUser = () => client.query(AUTH_USER).toPromise();

router.beforeResolve((to, from, next) => {
	if (to.meta.publicOnly) {
		getUser().then(result => {
			if (result.data && !result.error) {
				next('/');
			} else {
				next();
			}
		});
	} else if (to.meta.requiresAuth) {
		getUser().then(result => {
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
