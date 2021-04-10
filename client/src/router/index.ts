import * as VueRouter from 'vue-router';
import Home from '@/pages/home.vue';
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';

const routes: VueRouter.RouteRecordRaw[] = [
	{ path: '/', name: 'home-page', component: Home },
	{ path: '/login', name: 'login-page', component: Login },
	{ path: '/register', name: 'register-page', component: Register }
];

export default VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
	strict: true
});
