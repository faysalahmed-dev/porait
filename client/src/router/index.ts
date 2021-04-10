import * as VueRouter from 'vue-router';
import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import ForgetPassword from '@/pages/forget-password.vue';
import PageNotFound from '@/pages/404.vue';
import EmailVerify from '@/pages/email-verify.vue';

const routes: VueRouter.RouteRecordRaw[] = [
	{ path: '/', name: 'home-page', component: Home },
	{ path: '/login', name: 'login-page', component: Login },
	{ path: '/register', name: 'register-page', component: Register },
	{ path: '/forget-password', name: 'forget-password-page', component: ForgetPassword },
	{ path: '/:pathMatch(.*)*', name: '404-page', component: PageNotFound },
	{ path: '/verify-email', name: 'verify-email-page', component: EmailVerify }
];

export default VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
	strict: true
});
